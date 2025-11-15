var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Provider } from "react-redux";
import { createAsyncThunk, createSlice, combineReducers, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Chart } from "chart.js/auto";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const requestInterceptor = {
  onFulfilled: (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  onRejected: (error) => {
    return Promise.reject(error);
  }
};
const createErrorResponse = (error) => {
  var _a;
  const errorResponse = {
    message: "An unexpected error occurred",
    status: 500
  };
  if (error.response) {
    errorResponse.status = error.response.status;
    errorResponse.message = ((_a = error.response.data) == null ? void 0 : _a.message) || error.message;
    switch (error.response.status) {
      case 401:
        handleUnauthorized();
        break;
      case 403:
        errorResponse.message = "Access denied";
        break;
      case 404:
        errorResponse.message = "Resource not found";
        break;
      case 422:
        errorResponse.message = "Validation failed";
        break;
      case 500:
        errorResponse.message = "Server error";
        break;
    }
  } else if (error.request) {
    errorResponse.message = "No response from server";
    errorResponse.status = 503;
  }
  return errorResponse;
};
const handleUnauthorized = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
const handleAxiosError = (error) => {
  var _a, _b;
  if (axios.isAxiosError(error)) {
    return ((_a = error.response) == null ? void 0 : _a.data) || {
      message: error.message,
      status: ((_b = error.response) == null ? void 0 : _b.status) || 500
    };
  }
  return {
    message: "An unexpected error occurred",
    status: 500
  };
};
const responseInterceptor = {
  onFulfilled: (response) => {
    return response;
  },
  onRejected: (error) => {
    const errorResponse = createErrorResponse(error);
    return Promise.reject(errorResponse);
  }
};
const setupInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    requestInterceptor.onFulfilled,
    requestInterceptor.onRejected
  );
  axiosInstance.interceptors.response.use(
    responseInterceptor.onFulfilled,
    responseInterceptor.onRejected
  );
};
const createGetMethods = (api) => ({
  async get(url, config) {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  }
});
const createPostMethods = (api) => ({
  async post(url, data, config) {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  }
});
const createPutMethods = (api) => ({
  async put(url, data, config) {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  }
});
const createDeleteMethods = (api) => ({
  async delete(url, config) {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  }
});
const createHttpMethods = (api) => ({
  ...createGetMethods(api),
  ...createPostMethods(api),
  ...createPutMethods(api),
  ...createDeleteMethods(api)
});
class HttpService {
  constructor() {
    __publicField(this, "api");
    __publicField(this, "get");
    __publicField(this, "post");
    __publicField(this, "put");
    __publicField(this, "delete");
    this.api = axios.create({
      baseURL: "http://localhost:3000/api",
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 1e4
    });
    setupInterceptors(this.api);
    const httpMethods = createHttpMethods(this.api);
    this.get = httpMethods.get;
    this.post = httpMethods.post;
    this.put = httpMethods.put;
    this.delete = httpMethods.delete;
  }
}
const httpService = new HttpService();
const USER_ENDPOINTS = {
  ALL_USER: "/user/get-all",
  USER: "/user",
  CREATE_USER: "/user/create",
  UPDATE_USER: "/user/update",
  DELETE_USER: "/user"
};
const userService = {
  getUsers: () => httpService.get(USER_ENDPOINTS.ALL_USER),
  getUserById: (id) => httpService.get(`${USER_ENDPOINTS.USER}/${id}`),
  createUser: (user) => httpService.post(`${USER_ENDPOINTS.CREATE_USER}`, user),
  updateUser: (id, user) => httpService.put(`${USER_ENDPOINTS.UPDATE_USER}/${id}`, user),
  deleteUser: (id) => httpService.delete(`${USER_ENDPOINTS.DELETE_USER}/${id}`)
};
const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getUsers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState$1 = {
  users: [],
  loading: false,
  error: null
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState$1,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = true;
      state.users = action.payload;
    }).addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});
const userReducer = userSlice.reducer;
const initialState = {
  users: [],
  loading: false,
  error: null
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetUser(state) {
      state.users = [];
    },
    setUser(state) {
      state.users = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = true;
      state.users = action.payload;
    }).addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});
const { resetUser, setUser } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});
const store = configureStore({
  reducer: rootReducer
});
function Providers({ children }) {
  return /* @__PURE__ */ jsx(Provider, { store, children });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Onest:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
}];
function Layout$3({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    suppressHydrationWarning: true,
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Providers, {
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout: Layout$3,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const CasaLogo = "/facto-mentor-project-main/assets/casa-logo-rp9kUJ7w.png";
const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const navLinkStyle = "font-roboto text-heading text-[16px] sm:text-[18px] xl:text-[17px] 2xl:text-[18px] px-[3px] leading-[30px] font-normal";
  const buttonToggle = () => {
    setIsToggle(!isToggle);
  };
  return /* @__PURE__ */ jsx("header", { className: "py-[14px] sm:py-[20px]", children: /* @__PURE__ */ jsx("div", { className: "container container-pad", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-[18px] xl:gap-[24px]", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-label": "left",
        className: "flex items-center justify-start gap-[13px] sm:gap-[16px]",
        children: /* @__PURE__ */ jsx(
          Link,
          {
            to: "#",
            className: "max-w-[100px] sm:max-w-[128px] xl:max-w-[140px] 2xl:max-w-[151px] w-full",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: CasaLogo,
                className: "max-w-[100px] sm:max-w-[128px] xl:max-w-[140px] 2xl:max-w-[151px] w-full",
                alt: "logo"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "bg-white z-50 transition-all xl:transition-none duration-150 xl:duration-[0] w-[320px] sm:w-[340px] xl:w-auto xl:bg-transparent xl:flex fixed top-0 h-[100vh] xl:h-auto  xl:relative",
          isToggle ? "left-0 xl:left-0" : "-left-full xl:left-0"
        ),
        "aria-label": "center",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-[24px] p-[13px] sm:p-[16px] xl:hidden", children: [
            /* @__PURE__ */ jsx(Link, { to: "#", className: "max-w-[112px] sm:max-w-[130px] w-full", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: CasaLogo,
                className: "max-w-[112px] sm:max-w-[130px] w-full",
                alt: "logo"
              }
            ) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "underline font-roboto text-heading text-[15px] sm:text-[16px]",
                onClick: buttonToggle,
                children: "Close"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "p-[13px] sm:p-[16px] h-[calc(91vh-28px)] sm:h-[calc(87vh)] xl:h-auto xl:p-0 flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-center gap-[22px] sm:gap-[28px] xl:gap-[40px] 2xl:gap-[48px] overflow-auto"
              ),
              children: [
                /* @__PURE__ */ jsx(Link, { to: "/about", className: cn(navLinkStyle), children: "Services" }),
                /* @__PURE__ */ jsx(Link, { to: "#", className: cn(navLinkStyle), children: "How it works" }),
                /* @__PURE__ */ jsx(Link, { to: "#", className: cn(navLinkStyle), children: "Why is different" }),
                /* @__PURE__ */ jsx(Link, { to: "#", className: cn(navLinkStyle), children: "Reviews" }),
                /* @__PURE__ */ jsx(Link, { to: "#", className: cn(navLinkStyle), children: "Pricing" }),
                /* @__PURE__ */ jsx(Link, { to: "#", className: cn(navLinkStyle), children: "Contact" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "block p-[16px] xl:hidden", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "block xl:hidden text-[14px] sm:text-[16px] xl:text-[18px] leading-[22px] sm:leading-[26px]\n                 text-white font-manrope py-[8px] sm:py-[12px] px-[20px] sm:px-[26px] xl:py-[14px] xl:px-[34px] rounded-[999px]\n                  w-full bg-[#141414] font-semibold",
              children: "Sign Up"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "block xl:hidden opacity-0 invisible transition-all duration-300 ease-linear fixed top-0 left-0 w-full h-screen z-40 bg-[#98969665]",
          isToggle && "opacity-100 visible xl:opacity-0 xl:invisible"
        ),
        role: "overlay",
        onClick: buttonToggle
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        "aria-label": "right",
        className: "max-w-[148px] sm:max-w-[181px] xl:max-w-[323px] w-full flex items-center justify-end gap-[12px] sm:gap-[14px] xl:gap-[20px] 2xl:gap-[24px]",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "text-[14px] sm:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-[22px] sm:leading-[26px] text-primary font-manrope py-[7px] sm:py-[12px] px-[20px] sm:px-[26px] xl:py-[14px] xl:px-[34px] 2xl:py-[16px] 2xl:px-[40px] rounded-[999px] max-w-[100px] sm:max-w-[135px] xl:max-w-[145px] w-full block bg-[#DFEDE3] font-semibold",
              children: "Sign In"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "hidden xl:block text-[16px] xl:text-[18px] 2xl:text-[20px] leading-[26px] text-white font-manrope\n               py-[12px] px-[26px] xl:py-[14px] xl:px-[34px] 2xl:py-[16px] 2xl:px-[40px] rounded-[999px]\n                max-w-[144px] xl:max-w-[154px] w-full block bg-[#141414] font-semibold",
              children: "Sign Up"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "flex items-center justify-center xl:hidden h-[34px] min-w-[36px] max-w-[36px] sm:h-[46px] sm:min-w-[50px]\n               sm:max-w-[50px] rounded-md bg-[#141414]",
              type: "button",
              onClick: buttonToggle,
              children: /* @__PURE__ */ jsxs("div", { className: "min-w-[19px] max-w-[19px] h-[14px] sm:min-w-[24px] sm:max-w-[24px] sm:h-[17px]\n               md:min-w-[26px] md:max-w-[26px] md:h-[18px] justify-between flex flex-col gap-[3px] cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "bg-white w-full h-[2px] rounded-[10px]" }),
                /* @__PURE__ */ jsx("span", { className: "bg-white w-full h-[2px] rounded-[10px]" }),
                /* @__PURE__ */ jsx("span", { className: "bg-white w-full h-[2px] rounded-[10px]" })
              ] })
            }
          )
        ]
      }
    )
  ] }) }) });
};
const Layout$2 = UNSAFE_withComponentProps(function BaseLayout() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout$2
}, Symbol.toStringTag, { value: "Module" }));
function BarChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Amount ($)",
            data: [1700, 1e3, 1200, 1500, 2450, 1600, 1600],
            backgroundColor: [
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5"
            ],
            borderRadius: 1,
            hoverBackgroundColor: "#0F4E23"
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { display: false },
          x: { grid: { display: false } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
    return () => {
      var _a;
      (_a = chartInstanceRef.current) == null ? void 0 : _a.destroy();
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("canvas", { ref: chartRef }) });
}
const Homo = "data:image/png;base64,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";
const card1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAT0SURBVHgBxVlNaBtHFH6ztqU2JpDEVAfLaS1omxC3rgu1c/RuTCFOoCaUGhy7YEMPCaXEpqQ9Wr7WB6uH0h4arNBIgaY0cWjqQ2prc+ghcg9qSqAhBi3YVsAljUISBwu0k/dGltDPajW7EfIHa0k7b9af3sz33psnBi5xc+0nVWFNPQqDfvzYg9e+nYuQBs4NYMwwTf63Cab+4cFPdXAB5sQ4lpzfBx7POZw2WURGFgYA1yGTmdECE4bsJCmCgpjXOw0cJqEu4GFZojUJLq1fmlSYMg3OPVYLhpnlMwOvj4btjGwJxlLRufp5rSqDkNZ+eqr6sAXEkrZ4r+KoCg0BT+CSa7jk6fIRxdLe44k1jhyB9eAev2o1UkFQLCtNaDQ4qLn/XYqSJV5aj4wrjM3DLsLk5tRAx1go/7lAMPZgvhO4N4bfpBN2FTyN+zGQ34/NhdvZliBj7shtPXkO8eV/YDP1EHz+A9D1wVvwWvsBcAeWi7kAQtnCg8J7pjcJDkHEbkR0uHFJh2f4Pg8fkjuCJIfPDronmtneT14UHtzxnjTu/rUKV75fxNf7luObqf9h8/pt0PFSPzoK6tBR9Oqb4ARms4fibzDnwVQ0KbP3ahGzAy37J2ePi1c58LTmH93PqCppVppitcxXYnfgm8kf4WURvPCFPEkzqykKKKqMbfLfDagHVlBMsjAZo3IOpIJy77F3Yc/eV+FlQPNPjPVL2zPOsOZU2BsyxoFDHTD781e46fvADWgezfe1t0nPQW7vsdhG9BFIlFLGvQ3oPOQX7yne5cSyCv+hYquBPHZytB9OjqnQundPxXNqg6eJIK9lRmHj88Gg5QaPLdyGKz8slhCl2HdiVAVtqK9AjBBHoc2i0L5bDIpYKYNmGaNW9AR5g7zWdaGUoIYxjq67K/cFSSLX1VupUgrq+kJcjPscBO+m8S8/poD4ip2Rx9sCLZ4WuPnLn3ALg+/W0+diL7UWicbnb4POwx3itZzYtfk/IPR1WCzv8Jnj8HZ3AOSAS7y8ETEYyAkleW8dfse0pl+Pi8+UJaqlM9qfK8t3RDahNHgEM8nwmUFL79ogwZbXItdQLUO1LK1Ekifap3Vj+FBFOivONnmRUKrLq5fGZdMeN/kCW1qP4qEI5uwM8yI5P/cZ9B3rLrr/EPfeaoVIrNRLcCoSPFPPNCs8mwDWZGuYFwntv3dwifIBm7ziG2oTIiE1E8nAYT/0at0Vz3AjEsxyeq5YkIiFv+Heuzj7q+NSqrwkGz9/Cj2rgQQMzX86IAgurUWCisKma80o33u1REKkqMjI2fYJe3mRsLDmH5nIeVC0NLyPJGdWZBIK3upQjoCVSMr3ohQyDMv+EaNQpuKBKYQHpnNOnvHsyZYo9a0yCXnMFTGBnPfEu/ytHS9S2e+qxRHHmEehiEKIw1hXDgO9p5H3SggKktiHwRJiDnYTWT6hFfVrSg7uGp5HTc6/hd0C/m+trJlk3ZtJRel8rEJDwRN4Bnm//K51b2Z7+xT+TUCDwDncouaR1ZjtYdONsh2DlrVjtGqLT7GbO0ATOZ/Ar2FA/YF9bHPKjhzBliABHxDGZriGy3AR6gUSYmY7oBU1iarBWRP9weVOnuVBpmBn33mTCZtBRCwTsmpU1oVgMWJrl1X8eUFFsj1EljFR9BZ+hsCDzmNSJh4ddeAsoR0c0cEFXgDxzThejuDhVQAAAABJRU5ErkJggg==";
const card2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARGSURBVHgBzZpNbBNHFMf/szZO1V6MkJCqoNY5tFIlpJpTRS94cystUtIPiRKVlHLrISTXqlIdqeIKObS3NqnapJF6IBKlpzYbLuWIkTjBIctHhIQEmAMIFnaH98axcWzvemY/jH+Ss/buZP3evP+bnXljgRRwNheLwa7CBCTKliXeplNlehW3X01cuu4GUl6hY83yvQ177ISLhAjEhI1GoXAKUlToLhXEQcpaEGAhiTPGDrQMh5jFzh5OiFyC582bOmLkgLO1/EP6hnciq/bo1Lxuay0HnDuLJQSFc9S8jMHgwntq60TD6tfAuf3HNIKRywM0nimRTC87N3+f6Ncw0gElGWEtIVPJhCGKyOXONWQb0SrswrbeqxgKwvOipwP/Uuhy5D2GCEvi60P7jv3Web7LgUbCsuZfhWyikHUaZg90JnZ3DsgRB0NnPCP4+dOlih0OKN1LGgGGFlH+79ZydceZ5ptt6WwiIefXL+GXv/7Rbn/0ExtHPx6HPkpKYySlOn9qRUD6u6pIyN17D7B6YV27vbnxjCgG+cJs6xP/SaP3Hz1+grnTP5ETda328Yxv8jIKKgKBX6ggIasXnAEZz7yMgnLAEuIUEsC6P7/+v1bb5MY3sHLiEB9FUvmw7udO/6wk1I+0jG/hPd1tJZEPG/39mV9fjfFEkCtMsIRizzJ1dZ+F8QrBS1iI9xEDXd1nZjzUEFoS61vLroBaiGtjontd3nj9NZz8/DDGDx4w+Tc3b2q8ie512f9OCTPTn2HvHtMpmCzmYYjJeK/DyS8+wpHxDxEPURTO1opEily9tqki1I+9e3Zj5vgk9r87hiRwBLg7U5s+r/7t9G1zZPygSmzWfVLyEvKh4Ll2CnDvX70e/kyMmahRuHkEqNGEwiiRw4jq/fiJGo6UuJGXAm7s+mIbUb2fLFHDkVSa5ByoIQV69X5aiRoGLfRreeuZt4bCyCIS0Kv300zUUHxrw1JLM4ENJKC999ngmeOfkmwOZ2s8Kcce+9JVD7LAlxeprl9BDNp7P4tEDcWXC3xQDljPvbMkI17UGH9zs/ezStRQSD58UCsyllEQNDwygXv/7v06fpz7ZrDGQyyxfPhdqyqhotB4KmvDE7oz332b2SgTiodWnbTlQJwofFB+L+tE7YGcb/Y+010b3Vrhuugg9wJMcO3RYzvC3V0btcQkDKU0IKgWJOzOk10O2G9SeKScw7Dh+yfapdOk5w6NvW9qibWGoYF0/9ZXa72uRM7jqFpdpSaRWzzZQ8aPTlXDrvadiDo3VyaQA8+VBr1nUGcpN9QQjuY2658lupkzuL0DWYNnTfbSfCemG93VjCVFo59ciJJMJ+Y/NaBoSF9WhcA00kMZTiXzs82NC13i/9iDZeUHFSppzAoRr7pHS8KLQsiNOIY3SWM12XImkCiTM2W6a4lu3L7OrpOjD1nbMoBrCauGZ0/W4hrdzgu359ZpaQHkzwAAAABJRU5ErkJggg==";
const card3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATdSURBVHgBzZpNbBtVEMf/73mtXEjkS5FSNWmWNKkghzgpB3oh7qmHfqg9IPFRqSBR6K1NVJBQoHUoFZcKmlsqIxEkEow4tCpw4NTk1B7S2BwA1aHYJVEqwcWhuQRn93VmY7ux13a8H3b9k6xdv32xZt6bmZ15EwEfSKSjofZA8ASUGRZS7hUCYSiE6FGoOEkgA6Uypql+hVDJnGHOvahHM/CIgEtY6A4teE5ARehnInCFSprKnPSijGMFngqO89i+wh5RCtP/G7kJp4o4UuDB8pVLfgtejgKivV3jE/XOr0uBPx593tO2ad6g2zCagUJmw8gdqmc35E4T0iufnSbhE2iW8IxAT5sWTPz59+UTO02tqUCaTEYpMY0GmkwNQlLIG2y2tSZVNSFLeLJHtAC1/KKiArx1rD1aCCHU2/qej7+xjZcP5B2Wbf5ZmE0tshubuaFyx7b5QJuhbqP1hGdC5Ng2qyhRgO2e3ig9aF3CSw8vR7cPFE0obzpptD7Ztc2cPqRHs/xFK4wGc0aUPAWNYHFhBan7/yCV+hePVv8rjvf178Lwy12IHOp18GsIPScDnA1E+YslcSNW//HjDcRnE4jPLFr31Rg+sAdTX70GhxR3wdqBYM6MwMfFZ6Fj1+/WFNwjxV2wFJAC5+ATE5d+wc+3fq97fv/+XXBDQAZG+CrZfOBTnvPF1XlHwjNuFaD3c4RTe2mZjw+w2fDHCZ27O3D0+ADc0h6QlDEo76u/SpHlu9mEo79h4adijp23FCXCmpRqUHn04PnbD0rCI8Mhcn19wzbe2dmBI8dfwhtvDaO9vQ1ekEL0SBNCh0fis6Wm8+77BzHz/SmMXojY5o5+EMF7Zw96Fn4LMUgBCHvhgdT90pfTxYnDJOAr1v3ivRXb/C+vzsE3BEIaPLK4sFy8Z+GPknlw/P9w7BbuLdgVYGX5uT874IMCq/nVZ7MpCH/2zA9Yop2pBDuvT8JbcDaahQd4RUcolymYzU7Ce448ZUgq19bgAY40Y3lnjV2/U1X4198cwrfxU5YSvkGnF5pSKimEcO3IR44NWEKxKcWm7tqec7J2hnbnAGWdfmMCDzWhRMbLa6CQCsSm7hTH2Mb5PdAowYsoM6kpgaRb+TmE/vTjbziGAWsNxi6MoI8U6t//vK+OWhU6JNYCRu6m0oJfwwUcQuMzCaxT5Ln46WE0mwAdCkudigIBMQcXFEJof7/bjNITSZI9YxX1pmnMwwVLqa2I00cm02xMZUzy1VJAmsY1eHwfNBs2H75aCrAZKdOchENejfRihD67/YztdUAlwLSeP+AqBqA0VTfkzFzYt+KhVgmCCvqCAsWDLbe70GwMKrv1bceLtlfAX8tXmtsLcAKlDi90j5fUL7azUaHJk2hNh84K6tqUD9oU0Ds/ypgKo2gxqJv5jl6h5VSxQ7Ove3yastS6G22Nhu1+X/cnNys9q5kGUXsnShNqtngaDQvf1zUerfZ8xzwu363hXKnZ4TXLpszWUGtSXYlomk7vFDc+mtc7SFKsP6nX0WZ12uhutEllyfcme2uYTDmOSwFrN7Z6CafhH5bgcjN3Tc83LurFdS3Gihh0riqhzpMyg3CDwjwVVHNuBC/gS1egoIzgf7cRMkxC9ZQdmPEKr1ESllTKzCghk1xIuRV6O08AsqsD8m8j5hAAAAAASUVORK5CYII=";
const sale = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANNSURBVHgBvVdBTBNBFP0zrSYGKXvSg0QXjIkYGuECHDAC8WA0mKInueDVExzlJEa9l7Mh4kGOpImQaKJSQg9ATKyWCDFRVqIXTivExNDsjP/P7pa2FHaybX1JOzu7M/Pe/Pl/5g8DTRh9puE0RhKMy6tMQgcAM+m199kGkJaUkJXAFiO7TspOW7bOuCyogXH9oimie2OMs5EiwkBIKad5XjyyX1sWhBFAMxaN/CFjbAyqAApJ8l0UcohFKgqgWcvj+QV8NKEmkBbbE/2VrMEPkN+40FFbcgLDCfEFGvvAlxLyms+8HActURBAay5jkY/1Iy8SsSM6fZ8oLAE5XP3JCcz0uNwa/Xmm39QdIt7SBlvbP+H3n10IC7bntNBSKAuIaH5Cp9PZU2fg87M0LCVfqR/Vw0JEuQpvbiRMg3EY0enU296NpM0w825WlfcH70FY0MZGfsfBiSR0O/XGu1U5PvVYLUFvew9UAbW1cyGhT7dHvOUS5L6vq7XP5FYh3toGTQ2NEBZ0rnD8u6zTuKkhppwvt7mu6n5JokILwEONe6daIIickFlb8crlkvchJZhRCDjhhgduK4e72XOtRABZgJai3AK0JMMDd5TFyE9m3s8eNbwRhQA8uDuqwo3IxqeeqEF95Da/oGN2lbR3w7NZPW9t/woSACSAtsRDrXBlbLAwm3KQQ1Jo0qxJoB+mJHR++S2+24EA2Jz25qNa0CCVyJUAtADBD0cSQMjkVrydMkiAtDimUJ8gJDJrqx5xV0EAkfoREgTJIMtRQRpCwj8P4q2uI1KpS64ECLbIIeKkwPWDUKBwpFCkH/kCmV8XlLxyO2XZEuQLCAnaEclJ556+9ATpCZBMTlNOEKHKibbTG2iPUMnnh69ZaDoZU0vx/M0MzC7Na/XjXAz93bDtQkYUu3U+iZVR+A+QAiZ35r65x/G+ImcCCwvqDgy9qOJyef0H8gXGj/XXVwTmgxyT0tT+HaEkLbdTG9iAD9VHBJFHhpDcKn5b+WKSwBxR1Phi4s7cKv/CKzV3LeF0SoBJqJYaHQ7JOyuRE4Ivp2gNIfIT2FArb/Sg9hYMteRhxNoC9oWYBuWPgkEfA0nX83NQej3/gaRZLnmadtdiRzsK/wAcNYZY5GJehAAAAABJRU5ErkJggg==";
const avgsale = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKYSURBVHgBtZVNaBNBFMf/s2lMClISK0pFyiZgkkKLaXqwotCgCBH7ERBBT1ZE8SLtRUQ81BxEvelB8NaCBxU8VO2hKEhyENpDrWAPbVCbiB9FSrv1iyYxO74ZkzYxH+7S+AthZ3ffvv+8eW/eMFTBEVQd+mZlgDEWBINKj9TcKw0crzj4IyWjj2rjiUQlH6ys45BP5dbMML0NwgCc8xESipQTsvz9oKHHPYg6/R4598EgFKEfFqXf5nGmUvHliYoCDb3uITK+TkM7zGOnb0O2XU6QSKxEQMw853xDiHxRJCv5SGQO5JpvykyLIWqDxtLZdpETRdzpdZkr1ZwHWr3ybwIHt1qGxYDlZj9fzmrHtq24c/Uimugq+PRlEecu38BnuhqBfc06Fd2aDlcyON5ziMod6D1zAX30//7jJ4YGTsMotIcGLfaWLdewvoGKSH5cwNjzF3LG38h58sMCzp4I4/6TZ0hnMv8UYPRTaIr+SgZiSQqXIz7/Xgp17WmHIRhXRZINV45wLkQ8rmaDXzApYIqp17Po6gwYthdLlIQJXs7MyerqaF3vJKIYug/sK2euiST3oUKSyyFy0tHmQ/fB/fJ+b6AN508ewxQJz8TfFhtzTFpsXqeLsh2ECWKT01B3NqH/6BF43M24ffchVdbTEjtq57eYI6w6uG5Zxn+AKVmXoo0mNCrXKGoMZ3yEfP/pRYxZT0GcUrVDU5geEQPZrldnF7V6T2OKIgmhBjDOLmmP342vCUiR+NJEvbdRtO8gNgDTWUQbe7N2rhSdaKtzS1GKZIUi6YT5U02TMy9wXiIgRUQkLdsfcK47KRy/QecxqpjD+WUphFX7yhH2qXo2HaZjULT03cj3LbH7GRK0f6JQft2UlViB31367mfFpuUjAAAAAElFTkSuQmCC";
const dollar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMeSURBVHgBzVdNaBNREJ631PYUTY9NC92AWPTSlFR7TCJWKNhgETzYQy2C0osGFI+28SgeUi9FQdRDexAUbb0ppB6LKcaLTYKQFfJzTDCnVrPPmbdJzM+m+7YmkA+Wl+x7+2bmm3nzZhhIIl1IOwGOXVYU8HEOHgCm4mtnZboIwDXGWFzXy58Byu/cg+6izL7MakG6kFcB/oQYUxbqBFpvzOClrh+EURHt0HXQVnDaqSgDy5zzEPwHkJWIru+H2zHCzIXnVcZ4FGlVoTPQOD8ImLGhtArPeDosnIAG9Udp7+YJ1ii845Y3o4UJ9k942snYwNcuCq9XYqIaEzUXUMDZFT7rn4EgPjahGrIMCAYM6vU02MTkyXExxn58A7tAFtzkigoD5RUb38LuTgy23r6v/aff9M4e+sTxZobv+wsyn6T2knB3KQT5TM503jXigqfrz2Fo2AUSKBILqEDmOiaLFzJfkM9J+KnTYzCGTz1iyEA+i3NnxmBj87XMduiG8mIfjn6Zxdsfo0K4C63b2GoVUPpVgqBvBlLfk2Ld0Ig1C4qi+PrQ+nGQQD6TFaPvYsB03nHcAeuoWCqRlBJO4Jx5KAhVmcVELeHDm01BtRkoBvwXAmADKtOKWS67+tb8jbbRTsJ90wG4eXsJHA4HyMKWAuTnZ0/WjHhow4J3alKcBDsK0BGUvufbIYeBNz97FUqlklCAFJFAkWJAA0kcZjm54NKVoPid2kuAJDQFCw6pPEoW3sMkdK1ipamCn6JilExEVDXFKQ9s47NgtZgspARE2ZCo9p5rpDiZSNbyhH/6PMiA6sdqKqaLyDIOiAU6CW3dgMIfr0VqR9YKmIoHK7dhJoIJ6Q5IYnfnC+RQifD9B+L/8qOHQrh36qzsFqJoHT0xvNgb17F7cAirFL4KNkHB5pIMuEbhfLValvVOSUYv8HIIUG6C7qFalNZ6hIay3HCFPtclJcjNc829Qe81JgSDif2JowRmM2iPis81s3nJ5rS8gnnCMlvWAeNJf4VNbeTIzWmrIkZ7DkYJh+0bG4W69hwt/YljHERq/y3dnv8FJxyHgLj/ykYAAAAASUVORK5CYII=";
const man1 = "data:image/png;base64,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";
const man2 = "/facto-mentor-project-main/assets/man2-B3FwFgd8.png";
const man3 = "/facto-mentor-project-main/assets/man3-CqdKIGUp.png";
const man4 = "data:image/png;base64,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";
const man5 = "/facto-mentor-project-main/assets/man5-Ch5z6k2k.png";
const man6 = "/facto-mentor-project-main/assets/man6-Bx7ierwX.png";
const nine = "data:image/png;base64,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";
const line = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABACAYAAADbER1AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAhSURBVHgB7cQxEQAACAJAzv45rGEacwAZmPnhcb8cWEsSYwUDyGI5uSQAAAAASUVORK5CYII=";
const company1 = "data:image/png;base64,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";
const company2 = "data:image/png;base64,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";
const company3 = "data:image/png;base64,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";
const company4 = "data:image/png;base64,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";
const company5 = "data:image/png;base64,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";
const cash1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU3SURBVHgB5ZpRaFtVGMe/cxc2GJaloOA2bBNwtD6ZYn0cdj5s7sWtsO2lgzmHoA/aIviw4Vgm04IPmuGDos5WsS/1oZ0gw6dmbm/raPa0FQe57aQVFBJQhMUm1+9/bk64aZLm5OaeLHf+4PbenN4k95/vnP855ztHUMBkc9koUSRBJBKWRc87DuGayyi26VabyOFD5B3Huc7XmXjvM2kKGEEB4IraNiKENQ5hXBQlf+T5SDtO8Wq8t2+aAqAtgRBmWdvHOUoT5F9UI2whKF0qFS7Ge+M2+cSXQMPCamChSRb6rR+hLQvM5laPCrFtijogbBM2V92LrVZdbYFu1HZcYEOYoEeIECJVKj1Etc1r3a9zUza3HhOiNMeXCeoOOJqFAzpVtqlAV5yzwDYeo+5CS+SWArtYnKKpyIYCQyBOsaXIugJhKELsWAqBOEWmLLLGeKx6d8MtQyQOJNxnrqUmgtncb6+xFU9RCOF+cpT7yXlvWZXAELW7RqA9DnmralUVtazSqRCLAzGeyVQNRCoRLHfmWQo/PP0qxFUUPREsJunxIOqNYiWCdn4tq1s9//rnb5r5+Qf6ng9cm2TPk0/T8HND9NboaXmtSSWKUmArzrn25+905qN35LmTQNzspW+oZ+cTWvcrR42UXx7VnVh8PjclxeELPx3/kAb795FJ1v5YpzOT4/I7UWve5EjqIESEsws0b7kvrJdIk8W7S/J85exl4+LAnqd2U4p/SIAmoY+TkFO8bO7BCLUweVVVE1/cKQbKP2SL7V0mvyLlJJExlCHdupepRH+gbx+dPHSMXt1/mMzCmT0O5QgZAtE+8f7rst0qcWB59Vc6/9UkHX73hFGzQtrSYvfcRYZQbgtD+prb7M0vfqI73/0izQllypFNdTWOwxHkP3EywI83rlXEzV66Qi9yX9azs0f+7+UX9kvLVyJnWjKPlohyBKmfDKAc772xtyvCvKA/++CNs/L61r0lMkTMogBAW8LhZXn1vjwjWo1Q3czi3UzTz/NLIAK3Yqv2pTsqaYcIBcC1T2ZryoYHE7TIXQMcc3hwqO77Fm7fkOeBvmebfp5f2GRohQygRJ3/crJuFFH28cxn8nrs0HEyhA2TyZEBTr5yvOKS6AsXbt+U5RCGyKJMuewRQx0+Z+FXIvznDveFgY9m0L4wXlUD5YnL52rugTjcYw4njzYICztFBsB4Fe3pKveJ6OuUs6J94kCU63UhwSHSEaysBrQO2hBUwSPGx531cDLcTWwgglorNUBZu4pGJ6jMYPRn9CCPJXHLTc6IjO67xg66jjeROteRWf3yyn05XgWo1ro4Tuk6zuWUhVzUnNN5I1xQOWAnUYakOw/llMVpLJaWBWItYjtShloTX6QR5BSI7d60UDSJsYPHWjUkOxbdKycRnrzogySnLi7QYwD37dP9u/bK5I1nLLqRohbMppvBzgx1XREIs+GGabLX7Qg89KzadrJpNhH6KNpEhWlvQZVAN4pFvcRjF+JuM6le6a2ZDyIbzOPT0FVVPHO9PTQNJrz/Jskdo4YFu/zMNdQV6FZVa5QN16bux260Pg/+v9tIFGHfCNQ06RTv3c0fJA50WXXN6G7l0sqquSIfDnWDu+IZdMUBH9spsVhqPYp9NPnyDGG+lTf53BC7HuMRHwulTgzOWRhxzSmkdLdQemlzSzOEFpPuAmrgEW1LmCKwZAyqLn8cT5wJq8W+N6Ujy8e1g8fExXQ7whRGsk3uqjFSkYLPDosVsc2LPG7C2YGAjHsg+bWRCUKUl/8Abih/8IsfzOEAAAAASUVORK5CYII=";
const cash2 = "data:image/png;base64,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";
const cash3 = "data:image/png;base64,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";
function meta$4() {
  return [{
    title: "Home"
  }, {
    name: "Home",
    content: "Welcome to facto"
  }];
}
const Home = () => {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "container container-pad",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mt-[100px] md:mt-[130px] lg:mt-[141px] max-w-[320px] sm:max-w-[591px] md:max-w-[701px] lg:max-w-[901px] xl:max-w-[950px] 2xl:max-w-[1042px]\n         flex flex-col justify-center items-center gap-[22px] sm:gap-[26px] md:gap-[30px] lg:gap-[32px] mx-auto",
        children: [/* @__PURE__ */ jsx("div", {
          className: "max-w-[165px] sm:max-w-[210px] md:max-w-[272px] lg:max-w-[279px] max-h-[42px]",
          children: /* @__PURE__ */ jsx("p", {
            className: "font-manrope font-medium w-full h-full text-[12px] sm:text-[14px] md:text-[18px] lg:text-[20px] text-center leading-[24px]\n             md:leading-[26px] text-primary bg-[#DFEDE3] rounded-[999px] px-[12px] py-[6px] sm:px-[22px] sm:py-[7px] lg:px-[24px] lg:py-[8px]",
            children: "Fast. secure. hassle-free"
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col justify-center items-center gap-[18px] sm:gap-[20px] md:gap-[22px] lg:gap-[24px]",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-[319px] sm:w-[590px] md:w-[700px] lg:w-[900px] xl:w-[949px] 2xl:w-[1041px]",
            children: /* @__PURE__ */ jsxs("h3", {
              className: "font-roboto w-full font-extrabold text-[21px] sm:text-[40px] md:text-[48px] lg:text-[62px] xl:text-[66px] 2xl:text-[72px]\n               leading-[45px] sm:leading-[68px] md:leading-[72px] lg:leading-[76px] xl:leading-[82px] text-center text-[#141414]",
              children: ["Get Paid Faster ", /* @__PURE__ */ jsx("img", {
                src: Homo,
                alt: "home",
                className: "w-[34px] h-[22px] sm:w-[58px] sm:h-[38px] md:w-[62px] md:h-[42px] lg:w-[66px] lg:h-[44px] xl:w-[72px] xl:h-[48px] inline-flex"
              }), " Instant Cash for Businesses!"]
            })
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("p", {
              className: "text-[12px] sm:text-[14px] md:text-[17px] lg:text-[21px] xl:text-[22px] 2xl:text-[24px] font-manrope font-normal\n               leading-[20px] sm:leading-[30px] md:leading-[32px] lg:leading-[36px] xl:leading-[36px] text-[#686868] text-center",
              children: "Stop waiting months for credit card payments. CASA helps business owners access cash instantly by converting card transactions into immediate funds."
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-[7px] sm:mt-[9px] md:mt-[13px] lg:mt-[16px] max-w-[192px] max-h-[58px]",
          children: /* @__PURE__ */ jsx("button", {
            type: "button",
            className: " w-full h-full text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-manrope font-semibold leading-[24px]\n            px-[32px] py-[12px] md:px-[35px] md:py-[14px] lg:px-[38px] lg:py-[15px] xl:px-[40px] xl:py-[16px] text-white bg-primary rounded-[999px]",
            children: "Get Started"
          })
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-[130px]",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-[36px]",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-[#E0F0E5] max-h-[600px] xl:max-h-[600px] md:max-h-[600px] sm:max-h-[665px] lg:max-h-[665px] 2xl:max-h-[665px]\n             max-w-[340px] sm:max-w-[457px] md:max-w-[360px] lg:max-w-[457px] xl:max-w-[360px] 2xl:max-w-[457px] flex flex-col justify-between\n             items-center gap-[42px] md:gap-[42px] xl:gap-[42px] sm:gap-[50px] lg:gap-[50px] 2xl:gap-[50px] py-[46px] px-[28px] rounded-[24px] mx-auto",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex justify-between items-start gap-[20px] md:gap-[20px] xl:gap-[20px] sm:gap-[24px] lg:gap-[24px] 2xl:gap-[24px]",
              children: [/* @__PURE__ */ jsx("img", {
                src: card1,
                alt: "",
                className: "w-[32px] h-[32px] md:w-[32px] md:h-[32px] xl:w-[32px] xl:h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[40px] lg:h-[40px] 2xl:w-[40px] 2xl:h-[40px]"
              }), /* @__PURE__ */ jsx("h3", {
                className: "font-roboto font-semibold text-[27px] md:text-[27px] xl:text-[27px] sm:text-[32px] lg:text-[32px] 2xl:text-[32px]\n                 leading-[32px] md:leading-[32px] xl:leading-[32px] sm:leading-[40px] lg:leading-[40px] 2xl:leading-[40px] text-[#141414]",
                children: "Sales overview from Previous Day"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "max-w-[300px] sm:max-w-[400px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[300px] 2xl:max-w-[400px]\n               max-h-[300px] sm:max-h-[361px] md:max-h-[300px] lg:max-h-[361px] xl:max-h-[300px] 2xl:max-h-[361px] rounded-[24px] bg-white",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex justify-between items-center gap-[14px] sm:gap-[16px] md:gap-[14px] lg:gap-[16px] xl:gap-[14px] 2xl:gap-[16px]\n                 pt-[24px] sm:pt-[32px] md:pt-[24px] lg:pt-[32px] xl:pt-[24px] 2xl:pt-[32px] pl-[24px] sm:pl-[32.5px] md:pl-[24px] lg:pl-[32.5px]\n                  xl:pl-[24px] 2xl:pl-[32.5px] pr-[42px] sm:pr-[59.5px] md:pr-[42px] lg:pr-[59.5px] xl:pr-[42px] 2xl:pr-[59.5px]",
                children: [/* @__PURE__ */ jsx("img", {
                  src: sale,
                  alt: ""
                }), /* @__PURE__ */ jsxs("p", {
                  className: "text-[#686868] font-medium font-manrope text-[18px] md:text-[18px] xl:text-[18px] leading-[30px] md:leading-[30px]\n                   xl:leading-[30px] sm:text-[24px] lg:text-[24px] 2xl:text-[24px] sm:leading-[36px] lg:leading-[36px] 2xl:leading-[36px]",
                  children: ["Total sales :", /* @__PURE__ */ jsx("span", {
                    className: "font-roboto font-bold text-[22px] md:text-[22px] xl:text-[22px] leading-[30px] md:leading-[30px] xl:leading-[30px] sm:text-[32px]\n                      lg:text-[32px] 2xl:text-[32px] sm:leading-[40px] lg:leading-[40px] 2xl:leading-[40px]",
                    children: " $12,500"
                  })]
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "px-[33px] pb-[10px] md:pb-[10px] xl:pb-[10px] sm:pb-[27px] lg:pb-[27px] 2xl:pb-[27px] h-[179px]\n                 mt-[76px] md:mt-[76px] xl:mt-[76px] sm:mt-[83px] lg:mt-[83px] 2xl:mt-[83px]",
                children: /* @__PURE__ */ jsx(BarChart, {})
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "rounded-[24px] px-[14px] md:px-[14px] xl:px-[14px] sm:px-[22px] lg:px-[22px] 2xl:px-[22px] py-[14px] md:py-[14px] xl:py-[14px] sm:py-[16px] lg:py-[16px] 2xl:py-[16px] bg-[#BFE5A6] flex justify-between items-center\n               gap-[7px] md:gap-[7px] xl:gap-[7px] sm:gap-[10px] lg:gap-[10px] 2xl:gap-[10px] max-w-[300px] md:max-w-[300px] xl:max-w-[300px] sm:max-w-[400px] lg:max-w-[400px] 2xl:max-w-[400px]",
              children: [/* @__PURE__ */ jsx("img", {
                src: avgsale,
                alt: ""
              }), /* @__PURE__ */ jsx("p", {
                className: "font-roboto font-normal text-[#141414] text-[14px] md:text-[14px] xl:text-[14px] md:leading-[20px] xl:leading-[20px]\n                 leading-[20px] sm:text-[20px] lg:text-[20px] 2xl:text-[20px] sm:leading-[32px] lg:leading-[32px] 2xl:leading-[32px]",
                children: "Avg. sale: $104.16 / per transection"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-[#DAFFC2] max-h-[600px] xl:max-h-[600px] md:max-h-[600px] sm:max-h-[665px] lg:max-h-[665px] 2xl:max-h-[665px]\n             max-w-[340px] sm:max-w-[457px] md:max-w-[360px] lg:max-w-[457px] xl:max-w-[360px] 2xl:max-w-[457px] flex flex-col justify-between\n             items-center gap-[42px] md:gap-[42px] xl:gap-[42px] sm:gap-[48px] lg:gap-[48px] 2xl:gap-[48px] py-[46px] px-[28px] rounded-[24px] mx-auto",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex justify-between items-start gap-[20px] md:gap-[20px] xl:gap-[20px] sm:gap-[24px] lg:gap-[24px] 2xl:gap-[24px]",
              children: [/* @__PURE__ */ jsx("img", {
                src: card2,
                alt: "",
                className: "w-[32px] h-[32px] md:w-[32px] md:h-[32px] xl:w-[32px] xl:h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[40px] lg:h-[40px] 2xl:w-[40px] 2xl:h-[40px]"
              }), /* @__PURE__ */ jsx("h3", {
                className: "font-roboto font-semibold text-[27px] md:text-[27px] xl:text-[27px] sm:text-[32px] lg:text-[32px] 2xl:text-[32px]\n                 leading-[32px] md:leading-[32px] xl:leading-[32px] sm:leading-[40px] lg:leading-[40px] 2xl:leading-[40px] text-[#141414]",
                children: "Factoring Possible Amount."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col justify-between items-center gap-[36px] 2xl:gap-[36px]",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "bg-white rounded-[25px] p-[22px] sm:p-[24px] md:p-[22px] lg:p-[24px] xl:p-[22px] 2xl:p-[24px]\n                 max-w-[245px] max-h-[105px] sm:max-h-[125px] md:max-h-[105px] lg:max-h-[125px] xl:max-h-[105px] 2xl:max-h-[125px]",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "font-manrope font-normal text-[20px] sm:text-[24px] md:text-[20px] lg:text-[24px] xl:text-[20px] 2xl:text-[24px]\n                   leading-[30px] sm:leading-[36px] md:leading-[30px] lg:leading-[36px] xl:leading-[30px] 2xl:leading-[36px] text-[#686868] text-center",
                  children: "Available amount"
                }), /* @__PURE__ */ jsxs("p", {
                  className: "text-[#141414] mt-[12px] font-roboto font-semibold text-[28px] sm:text-[32px] md:text-[28px] lg:text-[32px] xl:text-[28px] 2xl:text-[32px]\n                   leading-[30px] sm:leading-[40px] md:leading-[30px] lg:leading-[40px] xl:leading-[30px] 2xl:leading-[40px] text-center",
                  children: ["$15,375", /* @__PURE__ */ jsx("span", {
                    className: "text-[14px] sm:text-[18px] md:text-[14px] lg:text-[18px] xl:text-[14px] 2xl:text-[18px]\n                     leading-[20px] sm:leading-[30px] md:leading-[20px] lg:leading-[30px] xl:leading-[20px] 2xl:leading-[30px] ml-[24px]",
                    children: "USD"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-white flex flex-col justify-between items-center gap-[30px] p-[24px] rounded-[25px] max-w-[400px]",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between items-start gap-[16px]",
                  children: [/* @__PURE__ */ jsx("img", {
                    src: dollar,
                    alt: ""
                  }), /* @__PURE__ */ jsx("p", {
                    className: "font-[500] font-roboto text-[20px] sm:text-[24px] md:text-[20px] lg:text-[24px] xl:text-[20px] 2xl:text-[24px]\n                     leading-[26px] sm:leading-[32px] md:leading-[26px] lg:leading-[32px] xl:leading-[26px] 2xl:leading-[32px] text-[#141414]",
                    children: "Factored amount vs. remaining balance"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "bg-[#E0F0E5] p-[7px] sm:p-[13px] md:p-[7px] lg:p-[13px] xl:p-[7px] 2xl:p-[13px] rounded-[24px] max-w-[374px] relative",
                  children: [/* @__PURE__ */ jsxs("p", {
                    className: "font-roboto font-semibold p-[7px] sm:p-[11px] md:p-[7px] lg:p-[11px] xl:p-[7px] 2xl:p-[11px]\n                     text-[14px] sm:text-[20px] md:text-[14px] lg:text-[20px] xl:text-[14px] 2xl:text-[20px] leading-[24px] sm:leading-[28px] md:leading-[24px] lg:leading-[28px] xl:leading-[24px] 2xl:leading-[28px] text-[#686868] max-w-[326px] text-center",
                    children: ["Factored Balance", /* @__PURE__ */ jsx("span", {
                      className: "text-[#141414] font-bold text-[17px] sm:text-[24px] md:text-[17px] lg:text-[24px] xl:text-[17px] 2xl:text-[24px]\n                       leading-[20px] sm:leading-[34px] md:leading-[20px] lg:leading-[34px] xl:leading-[20px] 2xl:leading-[34px] ml-[7px] sm:ml-[20px] md:ml-[7px] lg:ml-[20px] xl:ml-[7px] 2xl:ml-[20px]",
                      children: "$11,531.25"
                    })]
                  }), /* @__PURE__ */ jsx("p", {
                    className: "absolute font-bold text-[18px] top-[62px] sm:top-[85px] md:top-[62px] lg:top-[85px] xl:top-[62px] 2xl:top-[85px]\n                     left-[132px] sm:left-[220px] md:left-[132px] lg:left-[220px] xl:left-[132px] 2xl:left-[220px]",
                    children: "75%"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "h-[15px] bg-gray-100 rounded-full overflow-hidden max-w-[305px] mt-[48px] sm:mt-[45px] md:mt-[48px] lg:mt-[45px] xl:mt-[48px] 2xl:mt-[45px] mb-[11px]",
                    children: /* @__PURE__ */ jsx("div", {
                      className: "h-full bg-[#0F4E23] rounded-full w-[150px] md:w-[150px] xl:w-[150px] sm:w-[228px] lg:w-[228px] 2xl:w-[228px]"
                    })
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-[#F1F68E] max-h-[600px] xl:max-h-[600px] md:max-h-[600px] sm:max-h-[665px] lg:max-h-[665px] 2xl:max-h-[665px]\n             max-w-[340px] sm:max-w-[457px] md:max-w-[360px] lg:max-w-[457px] xl:max-w-[360px] 2xl:max-w-[457px] flex flex-col justify-between\n              items-center gap-[40px] py-[46px] px-[24px] rounded-[24px] mx-auto",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex justify-between items-start gap-[20px] md:gap-[20px] xl:gap-[20px] sm:gap-[24px] lg:gap-[24px] 2xl:gap-[24px] mx-auto",
              children: [/* @__PURE__ */ jsx("img", {
                src: card3,
                alt: "",
                className: "w-[32px] h-[32px] md:w-[32px] md:h-[32px] xl:w-[32px] xl:h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[40px] lg:h-[40px] 2xl:w-[40px] 2xl:h-[40px]"
              }), /* @__PURE__ */ jsx("h3", {
                className: "font-roboto font-semibold text-[24px] sm:text-[32px] md:text-[24px] lg:text-[32px] xl:text-[24px] 2xl:text-[32px] leading-[30px] 2xl:leading-[40px] text-[#141414]",
                children: "Secure & Streamlined Workflow"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col justify-between items-center gap-[28px] max-h-[459px]",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "max-w-[266.5px] max-h-[124.69px] py-[20px] px-[24px] rounded-[25px] bg-white flex flex-col \n                justify-between gap-[16px] relative -rotate-[12.89deg] top-[15px] sm:top-[20px] md:top-[15px] lg:top-[20px] xl:top-[15px] 2xl:top-[20px]",
                children: [/* @__PURE__ */ jsxs("p", {
                  className: "text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px] leading-[34px] text-center",
                  children: ["Recent User", /* @__PURE__ */ jsx("span", {
                    className: "font-semibold text-[14px] leading-[24px] text-[#686868] ml-[24px]",
                    children: "View All"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between items-center",
                  children: [/* @__PURE__ */ jsx("img", {
                    src: man1,
                    alt: "",
                    className: "relative"
                  }), /* @__PURE__ */ jsx("img", {
                    src: man2,
                    alt: "",
                    className: "relative right-[10px]"
                  }), /* @__PURE__ */ jsx("img", {
                    src: man3,
                    alt: "",
                    className: "relative right-[20px]"
                  }), /* @__PURE__ */ jsx("img", {
                    src: man4,
                    alt: "",
                    className: "relative right-[30px]"
                  }), /* @__PURE__ */ jsx("img", {
                    src: man5,
                    alt: "",
                    className: "relative right-[40px]"
                  }), /* @__PURE__ */ jsx("img", {
                    src: nine,
                    alt: "",
                    className: "relative right-[50px]"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-white max-h-[150px] sm:max-h-[166px] md:max-h-[150px] lg:max-h-[166px] xl:max-h-[150px] 2xl:max-h-[166px] max-w-[195px] rounded-[25px] px-[24px] py-[20px] flex flex-col \n                justify-between gap-[14px] sm:gap-[16px] md:gap-[14px] lg:gap-[16px] xl:gap-[14px] 2xl:gap-[16px] relative rotate-[2.5deg] top-[8px] sm:top-[10px] md:top-[8px] lg:top-[10px] xl:top-[8px] 2xl:top-[10px]\n                 left-[65px] sm:left-[80px] md:left-[65px] lg:left-[80px] xl:left-[65px] 2xl:left-[80px]",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex flex-col justify-between gap-[16px]",
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px] leading-[24px] 2xl:leading-[30px]",
                    children: "Total balance"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#141414] font-roboto font-bold text-[26px] sm:text-[32px] md:text-[26px] lg:text-[32px] xl:text-[26px] 2xl:text-[32px] leading-[30px] 2xl:leading-[40px]",
                    children: "23,576.00"
                  })]
                }), /* @__PURE__ */ jsxs("p", {
                  className: "text-[#686868] font-manrope font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px] leading-[20px] 2xl:leading-[26px]",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "bg-[#E0F0E5] inline-flex justify-center items-center h-[20px] w-[20px] rounded-full mr-[16px]",
                    children: "+"
                  }), "Add Number"]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-white max-w-[373px] max-h-[96px] rounded-[25px] py-[16px] px-[18px] sm:px-[24px] md:px-[18px] lg:px-[24px] xl:px-[18px] 2xl:px-[24px] flex justify-between\n                 items-center gap-[22px] sm:gap-[26px] md:gap-[22px] lg:gap-[26px] xl:gap-[22px] 2xl:gap-[26px] relative rotate-[6.68deg] -top-[13px]",
                children: [/* @__PURE__ */ jsx("img", {
                  src: man6,
                  alt: "",
                  className: "h-[52px] w-[52px] 2xl:h-[56px] 2xl:w-[56px]"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between items-center gap-[22px] max-w-[244px]",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col justify-between items-start gap-[10px] max-w-[126px]",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-[#141414] font-roboto font-bold text-[20px] sm:text-[24px] md:text-[20px] lg:text-[24px] xl:text-[20px] 2xl:text-[24px] leading-[28px] 2xl:leading-[34px]",
                      children: "Online"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-[#686868] font-manrope font-normal text-[12px] sm:text-[16px] md:text-[12px] lg:text-[16px] xl:text-[12px] 2xl:text-[16px]",
                      children: "Tomy Restaurant"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col justify-between items-center gap-[12px]",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-[#141414] font-roboto font-semibold text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px]\n                       xl:text-[18px] 2xl:text-[20px] leading-[20px] sm:leading-[28px] md:leading-[20px] lg:leading-[28px] xl:leading-[20px] 2xl:leading-[28px]",
                      children: "+$10k"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "bg-[#E0F0E5] rounded-[92px] py-[6px] sm:py-[8px] md:py-[6px] lg:py-[8px] xl:py-[6px] 2xl:py-[8px]\n                      px-[12px] sm:px-[16px] md:px-[12px] lg:px-[16px] xl:px-[12px] 2xl:px-[16px] font-roboto font-semibold\n                       text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] xl:text-[12px] 2xl:text-[14px] text-[#0F4E23]",
                      children: "confirm"
                    })]
                  })]
                })]
              })]
            })]
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "mt-[4px] bg-[#0F4E23] max-h-[168px] mb-[130px] sm:mb-[160px]",
      children: /* @__PURE__ */ jsx("div", {
        className: "container container-pad",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex justify-between items-center overflow-hidden",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex justify-center items-center gap-[27px] sm:gap-[40px] md:gap-[48px] lg:gap-[64px] xl:gap-[80px] 2xl:gap-[96px]\n                 bg-[#0F4E23] z-50",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex flex-col justify-center items-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px] xl:min-w-[180px] 2xl:min-w-[200px]",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-[14px] sm:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-bold font-roboto text-white",
                children: "Trusted By"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[14px] sm:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-bold font-roboto text-white",
                children: "Top Companies"
              })]
            }), /* @__PURE__ */ jsx("img", {
              src: line,
              alt: "",
              className: "h-[30px] sm:h-[40px] md:h-[50px]"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "animate-marquee whitespace-nowrap flex justify-between items-center gap-[27px] sm:gap-[40px] md:gap-[48px] lg:gap-[64px] xl:gap-[80px] 2xl:gap-[96px] py-[50px]",
            children: [/* @__PURE__ */ jsx("img", {
              src: company1,
              alt: "",
              className: "w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]"
            }), /* @__PURE__ */ jsx("img", {
              src: company2,
              alt: "",
              className: "w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]"
            }), /* @__PURE__ */ jsx("img", {
              src: company3,
              alt: "",
              className: "w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]"
            }), /* @__PURE__ */ jsx("img", {
              src: company4,
              alt: "",
              className: "w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]"
            }), /* @__PURE__ */ jsx("img", {
              src: company5,
              alt: "",
              className: "w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]"
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "container container-pad ",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-col lg:flex-row justify-between items-center gap-[40px] sm:gap-[45px] lg:gap-[105px] xl:gap-[120px] lg:items-start mb-[133px]",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-[350px] sm:max-w-[450px] xl:max-w-[555px] 2xl:max-w-[680px] flex flex-col justify-between items-center lg:items-start gap-[22px] xl:gap-[28px] 2xl:gap-[32px]",
          children: [/* @__PURE__ */ jsx("p", {
            className: "bg-[#DFEDE3] py-[6px] px-[22px] xl:py-[8px] xl:px-[24px] text-[#0F4E23] font-manrope font-semibold text-[16px] xl:text-[18px] 2xl:text-[20px] max-w-[220px]\n             xl:max-w-[234px] rounded-[999px]",
            children: "About Casa Service"
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-[#141414] font-roboto font-extrabold text-[28px] sm:text-[34px] xl:text-[43px] 2xl:text-[56px]\n             leading-[46px] sm:leading-[50px] lg:leading-[56px] 2xl:leading-[68px] text-center lg:text-start",
            children: "Revolutionizing Cash Flow for Business Owners!"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "max-w-[360px] sm:max-w-[480px] xl:max-w-[590px] 2xl:max-w-[619px] flex flex-col justify-between items-center lg:items-start gap-[32px]",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-[#686868] font-manrope font-normal text-[14px] sm:text-[18px] xl:text-[22px] 2xl:text-[24px]\n             leading-[28px] sm:leading-[32px] lg:leading-[36px] text-center lg:text-start",
            children: "Empowering businesses with faster cash access, CASA provides a secure, fast, and flexible solution to get early payments for credit card sales."
          }), /* @__PURE__ */ jsx("button", {
            type: "button",
            className: "bg-[#0F4E23] max-h-[50px] xl:max-h-[58px] py-[12px] px-[36px] xl:py-[14px] xl:px-[38px] 2xl:py-[16px] 2xl:px-[40px] text-white font-manrope\n                font-semibold text-[18px] 2xl:text-[20px] rounded-[999px]",
            children: "Join Now"
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-[36px] mb-[160px]",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "bg-[#F8F8F8] rounded-[25px] p-[44px] sm:p-[48px] md:p-[44px] lg:p-[48px] xl:p-[44px] 2xl:p-[48px] flex flex-col justify-between items-start gap-[20px] sm:gap-[24px] md:gap-[20px] lg:gap-[24px] xl:gap-[20px] 2xl:gap-[24px] \n           max-h-[408px] max-w-[340px] sm:max-w-[456px] md:max-w-[340px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px] group mx-auto hover:bg-[#0F4E23] duration-300",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px] leading-[40px] group-hover:text-white",
            children: "Secure and Instant Cash Advances"
          }), /* @__PURE__ */ jsx("img", {
            src: cash1,
            alt: ""
          }), /* @__PURE__ */ jsx("p", {
            className: "text-[#686868] font-manrope font-normal text-[17px] sm:text-[20px] md:text-[17px] lg:text-[20px] xl:text-[17px] 2xl:text-[20px] leading-[32px] group-hover:text-white",
            children: "No more waiting weeks—convert daily credit card transactions into cash within 24 hours to keep your business running smoothly."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "bg-[#F8F8F8] rounded-[25px] p-[44px] sm:p-[48px] md:p-[44px] lg:p-[48px] xl:p-[44px] 2xl:p-[48px] flex flex-col justify-between items-start gap-[20px] sm:gap-[24px] md:gap-[20px] lg:gap-[24px] xl:gap-[20px] 2xl:gap-[24px]  \n           max-h-[408px] max-w-[340px] sm:max-w-[456px] md:max-w-[340px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px] group mx-auto hover:bg-[#0F4E23] duration-300",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px] leading-[40px] group-hover:text-white",
            children: "Transparent and Fair Pricing Process"
          }), /* @__PURE__ */ jsx("img", {
            src: cash2,
            alt: ""
          }), /* @__PURE__ */ jsx("p", {
            className: "text-[#686868] font-manrope font-normal text-[17px] sm:text-[20px] md:text-[17px] lg:text-[20px] xl:text-[17px] 2xl:text-[20px] leading-[32px] group-hover:text-white",
            children: "No Hidden Fees, No Surprises Enjoy clear, upfront pricing with flexible funding options, so you always know what to expect."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "bg-[#F8F8F8] rounded-[25px] p-[44px] sm:p-[48px] md:p-[44px] lg:p-[48px] xl:p-[44px] 2xl:p-[48px] flex flex-col justify-between items-start\n           gap-[20px] sm:gap-[24px] md:gap-[20px] lg:gap-[24px] xl:gap-[20px] 2xl:gap-[24px] \n           max-h-[408px] max-w-[340px] sm:max-w-[456px] md:max-w-[340px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px] group mx-auto hover:bg-[#0F4E23] duration-300",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px] leading-[40px] group-hover:text-white",
            children: "Flexible and Secure Payout Options"
          }), /* @__PURE__ */ jsx("img", {
            src: cash3,
            alt: ""
          }), /* @__PURE__ */ jsx("p", {
            className: "text-[#686868] font-manrope font-normal text-[17px] sm:text-[20px] md:text-[17px] lg:text-[20px] xl:text-[17px] 2xl:text-[20px] leading-[32px] group-hover:text-white",
            children: "We offer flexible and easy payout options tailored to your needs, ensuring quick access to your funds. Choose from multiple payment methods"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "bg-[#F8F8F8]",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container container-pad",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-[350px] sm:max-w-[460px] md:max-w-[630px] lg:max-w-[750px] xl:max-w-[878px] flex flex-col justify-between\n          items-center gap-[26px] sm:gap-[28px] md:gap-[30px] lg:gap-[32px] mx-auto pt-[160px] pb-[130px]",
          children: [/* @__PURE__ */ jsx("p", {
            className: "bg-[#DFEDE3] rounded-[999px] py-[6px] px-[22px] lg:py-[8px] lg:px-[24px] max-w-[168px] font-manrope\n            font-semibold text-[15px] sm:text-[17px] lg:text-[18px] xl:text-[20px] text-[#0F4E23]",
            children: "How it works"
          }), /* @__PURE__ */ jsx("h3", {
            className: "font-roboto font-extrabold text-[34px] sm:text-[37px] md:text-[48px] lg:text-[54px] xl:text-[56px] leading-[54px] sm:leading-[60px] md:leading-[64px] lg:leading-[68px] text-[#141414] text-center",
            children: " Simple & Fast Receive Your Payment in 3 Steps!"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-[#686868] font-manrope font-normal text-[14px] sm:text-[16px] md:text-[17px] lg:text-[20px] xl:text-[24px] leading-[28px] sm:leading-[30px] md:leading-[33px] lg:leading-[36px] text-center",
            children: "Empowering businesses with faster cash access, CASA provides a secure, fast, and flexible solution to get early payments for credit card sales"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-[36px] pb-[160px]",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "h-[718px] max-w-[350px] sm:max-w-[456px] md:max-w-[350px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px]\n            flex flex-col justify-between items-center gap-[34px] sm:gap-[36px] md:gap-[34px] lg:gap-[36px] xl:gap-[34px] 2xl:gap-[36px]\n              rounded-[25px] py-[32px] sm:py-[36px] md:py-[32px] lg:py-[36px] xl:py-[32px] 2xl:py-[36px] px-[26px] sm:px-[29px] md:px-[26px] lg:px-[29px] xl:px-[26px] 2xl:px-[29px] bg-white shadow-sm mx-auto",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "bg-[#DAFFC2] flex flex-col justify-between items-start gap-[24px] py-[33px] px-[20px] sm:px-[24px] md:px-[20px] lg:px-[24px] xl:px-[20px] 2xl:px-[24px]\n              max-w-[330px] sm:max-w-[398px] md:max-w-[330px] lg:max-w-[398px] xl:max-w-[330px] 2xl:max-w-[398px] rounded-[25px]",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-[#141414] font-roboto font-bold text-[24px] pl-[6px]",
                children: "Sign Up"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                className: "bg-white rounded-[25px] outline-none w-[300px] sm:w-[350px] md:w-[300px] lg:w-[350px] xl:w-[300px] 2xl:w-[350px] h-[64px] text-[#68686880] px-[24px] text-[18px]",
                placeholder: "Name"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                className: "bg-white rounded-[25px] outline-none w-[300px] sm:w-[350px] md:w-[300px] lg:w-[350px] xl:w-[300px] 2xl:w-[350px] h-[64px] text-[#68686880] px-[24px] text-[18px]",
                placeholder: "Company Name"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                className: "bg-white rounded-[25px] outline-none w-[300px] sm:w-[350px] md:w-[300px] lg:w-[350px] xl:w-[300px] 2xl:w-[350px] h-[64px] text-[#68686880] px-[24px] text-[18px]",
                placeholder: "Password"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "max-w-[320px] sm:max-w-[380px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[320px] 2xl:max-w-[380px] flex flex-col justify-between items-start gap-[22px] sm:gap-[24px] md:gap-[22px] lg:gap-[24px] xl:gap-[22px] 2xl:gap-[24px]",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px]",
                children: "Connect Your Business"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#686868] font-manrope font-normal text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px] xl:text-[18px] 2xl:text-[20px] leading-[28px] sm:leading-[32px] md:leading-[28px] lg:leading-[32px] xl:leading-[28px] 2xl:leading-[32px]",
                children: "Sign up and link your credit card processor or POS system with CASA. We support all major payment provider"
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-col justify-between items-start gap-[8px]",
                children: [/* @__PURE__ */ jsxs("p", {
                  className: "text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[12px] w-[20px] h-[20px]\n                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3",
                    children: "✔️"
                  }), "Fast approval & easy integration"]
                }), /* @__PURE__ */ jsxs("p", {
                  className: "text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[12px] w-[20px] h-[20px]\n                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3",
                    children: "✔️"
                  }), "No impact on your credit score"]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "h-[718px] max-w-[350px] sm:max-w-[456px] md:max-w-[350px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px]\n            flex flex-col justify-between items-center gap-[34px] sm:gap-[36px] md:gap-[34px] lg:gap-[36px] xl:gap-[34px] 2xl:gap-[36px] rounded-[25px]\n              py-[32px] sm:py-[36px] md:py-[32px] lg:py-[36px] xl:py-[32px] 2xl:py-[36px] px-[26px] sm:px-[29px] md:px-[26px] lg:px-[29px] xl:px-[26px] 2xl:px-[29px] bg-white shadow-sm mx-auto",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "bg-[#F1F68E] flex flex-col justify-center gap-[20px] sm:gap-[24px] md:gap-[20px] lg:gap-[24px] xl:gap-[20px] 2xl:gap-[24px]\n              py-[20px] sm:py-[24px] md:py-[20px] lg:py-[24px] xl:py-[20px] 2xl:py-[24px] px-[28px] sm:px-[32px] md:px-[28px] lg:px-[32px] xl:px-[28px] 2xl:px-[32px]\n              rounded-[25px] max-w-[330px] sm:max-w-[396px] md:max-w-[330px] lg:max-w-[396px] xl:max-w-[330px] 2xl:max-w-[396px]",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "bg-white rounded-[25px] p-[8px] sm:p-[16px] md:p-[8px] lg:p-[16px] xl:p-[8px] 2xl:p-[16px] max-w-[300px] sm:max-w-[332px] md:max-w-[300px]\n                lg:max-w-[332px] xl:max-w-[300px] 2xl:max-w-[332px] flex justify-between items-center gap-[4px] sm:gap-[8px] md:gap-[4px] lg:gap-[8px] xl:gap-[4px] 2xl:gap-[8px]",
                children: [/* @__PURE__ */ jsx("img", {
                  src: man6,
                  alt: ""
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex flex-col justify-between items-start gap-[8px]",
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-[#141414] font-roboto font-bold text-[18px] sm:text-[24px] md:text-[18px] lg:text-[24px] xl:text-[18px] 2xl:text-[24px]",
                    children: "Maria Kosta"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#686868] font-roboto font-semibold text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] xl:text-[12px] 2xl:text-[14px]",
                    children: "maria@gmail.com"
                  })]
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-[#0F4E23] font-roboto font-bold text-[16px] sm:text-[24px] md:text-[16px] lg:text-[24px] xl:text-[16px] 2xl:text-[24px]",
                  children: "+$10k"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-col justify-between items-center gap-[18px] sm:gap-[20px] md:gap-[18px] lg:gap-[20px] xl:gap-[18px] 2xl:gap-[20px] py-[24px] px-[16px] max-w-[300px] sm:max-w-[332px] md:max-w-[300px] lg:max-w-[332px] xl:max-w-[300px] 2xl:max-w-[332px] bg-white rounded-[25px]",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between items-center gap-[50px] sm:gap-[119px] md:gap-[50px] lg:gap-[119px] xl:gap-[50px] 2xl:gap-[119px] max-w-[300px]",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col justify-between items-center gap-[16px]",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-[#686868] font-roboto font-semibold text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] xl:text-[12px] 2xl:text-[14px]",
                      children: "Total balance"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-[#141414] font-roboto font-semibold text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px] xl:text-[18px] 2xl:text-[20px]",
                      children: "$12000.00"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col justify-between items-center gap-[8px]",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "inline-flex justify-center items-center w-[40px] sm:w-[48px] md:w-[40px] lg:w-[48px] xl:w-[40px] 2xl:w-[48px] h-[40px] sm:h-[48px] md:h-[40px] lg:h-[48px] xl:h-[40px] 2xl:h-[48px] rounded-full bg-[#F1F68E]",
                      children: "10%"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-[#686868] font-roboto font-semibold text-[10px] sm:text-[14px] md:text-[10px] lg:text-[14px] xl:text-[10px] 2xl:text-[14px]",
                      children: "discount rate"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "bg-[#DAFFC2] flex justify-between items-center rounded-[12px] p-[24px] gap-[80px] sm:gap-[140px] md:gap-[80px] lg:gap-[140px] xl:gap-[80px] 2xl:gap-[140px] max-w-[299px] max-h-[40px]",
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-[#141414] font-roboto font-semibold text-[14px]",
                    children: "See detail"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#141414] font-roboto font-semibold text-[14px]",
                    children: "> >"
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "max-w-[320px] sm:max-w-[380px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[320px] 2xl:max-w-[380px] flex flex-col justify-between items-start gap-[22px] sm:gap-[24px] md:gap-[22px] lg:gap-[24px] xl:gap-[22px] 2xl:gap-[24px]",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px]",
                children: "Connect Your Business"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#686868] font-manrope font-normal text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px] xl:text-[18px] 2xl:text-[20px] leading-[28px] sm:leading-[32px] md:leading-[28px] lg:leading-[32px] xl:leading-[28px] 2xl:leading-[32px]",
                children: "Sign up and link your credit card processor or POS system with CASA. We support all major payment provider"
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-col justify-between items-start gap-[8px]",
                children: [/* @__PURE__ */ jsxs("p", {
                  className: "text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[12px] w-[20px] h-[20px]\n                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3",
                    children: "✔️"
                  }), "Fast approval & easy integration"]
                }), /* @__PURE__ */ jsxs("p", {
                  className: "text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[12px] w-[20px] h-[20px]\n                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3",
                    children: "✔️"
                  }), "No impact on your credit score"]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "h-[718px] max-w-[350px] sm:max-w-[456px] md:max-w-[350px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px]\n            flex flex-col justify-between items-center gap-[34px] sm:gap-[36px] md:gap-[34px] lg:gap-[36px] xl:gap-[34px] 2xl:gap-[36px]\n              rounded-[25px] py-[32px] sm:py-[36px] md:py-[32px] lg:py-[36px] xl:py-[32px] 2xl:py-[36px] px-[26px] sm:px-[29px] md:px-[26px] lg:px-[29px] xl:px-[26px] 2xl:px-[29px] bg-white shadow-sm mx-auto",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "bg-[#DAFFC2] p-[24px] flex flex-col justify-center items-center gap-[38px] sm:gap-[42px] md:gap-[38px] lg:gap-[42px] xl:gap-[38px] 2xl:gap-[42px] rounded-[25px]",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex justify-between items-start gap-[14px] p-[14px] sm:p-[24px] md:p-[14px] lg:p-[24px] xl:p-[14px] 2xl:p-[24px] rounded-[25px] bg-white max-w-[300px] sm:max-w-[349px] md:max-w-[300px] lg:max-w-[349px] xlmax-w-[300px] 2xl:max-w-[349px]",
                children: [/* @__PURE__ */ jsx("img", {
                  src: card3,
                  alt: ""
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex flex-col justify-between items-start gap-[8px]",
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-[#141414] font-roboto font-semibold text-[14px] sm:text-[18px] md:text-[14px] lg:text-[18px] xl:text-[14px] 2xl:text-[18px]",
                    children: "Receive Money from  card"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#686868] font-manrope font-normal text-[11px] sm:text-[16px] md:text-[11px] lg:text-[16px] xl:text-[11px] 2xl:text-[16px]",
                    children: "Cash Deposited Within 24 Hours"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-col justify-between items-start gap-[16px] bg-white rounded-[25px] p-[20px] sm:p-[24px] md:p-[20px] lg:p-[24px] xl:p-[20px] 2xl:p-[24px]",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between items-center gap-[70px] sm:gap-[100px] md:gap-[70px] lg:gap-[100px] xl:gap-[70px] 2xl:gap-[100px]",
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-[#141414] font-roboto font-bold text-[16px] sm:text-[24px] md:text-[16px] lg:text-[24px] xl:text-[16px] 2xl:text-[24px]",
                    children: "Recent User"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#686868] font-roboto font-bold text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] xl:text-[12px] 2xl:text-[14px]",
                    children: "View All"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between items-start",
                  children: [/* @__PURE__ */ jsx("img", {
                    src: man2,
                    alt: "",
                    className: "relative"
                  }), /* @__PURE__ */ jsx("img", {
                    src: man5,
                    alt: "",
                    className: "relative right-[12px]"
                  }), /* @__PURE__ */ jsx("img", {
                    src: man1,
                    alt: "",
                    className: "relative right-[24px]"
                  }), /* @__PURE__ */ jsx("img", {
                    src: man3,
                    alt: "",
                    className: "relative right-[36px]"
                  }), /* @__PURE__ */ jsx("img", {
                    src: man4,
                    alt: "",
                    className: "relative right-[48px]"
                  }), /* @__PURE__ */ jsx("img", {
                    src: nine,
                    alt: "",
                    className: "relative right-[60px]"
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "max-w-[320px] sm:max-w-[380px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[320px] 2xl:max-w-[380px] flex flex-col justify-between items-start gap-[22px] sm:gap-[24px] md:gap-[22px] lg:gap-[24px] xl:gap-[22px] 2xl:gap-[24px]",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px]",
                children: "Connect Your Business"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#686868] font-manrope font-normal text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px] xl:text-[18px] 2xl:text-[20px] leading-[28px] sm:leading-[32px] md:leading-[28px] lg:leading-[32px] xl:leading-[28px] 2xl:leading-[32px]",
                children: "Sign up and link your credit card processor or POS system with CASA. We support all major payment provider"
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-col justify-between items-start gap-[8px]",
                children: [/* @__PURE__ */ jsxs("p", {
                  className: "text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[12px] w-[20px] h-[20px]\n                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3",
                    children: "✔️"
                  }), "Fast approval & easy integration"]
                }), /* @__PURE__ */ jsxs("p", {
                  className: "text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[12px] w-[20px] h-[20px]\n                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3",
                    children: "✔️"
                  }), "No impact on your credit score"]
                })]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "container container-pad",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-[350px] sm:max-w-[460px] md:max-w-[610px] lg:max-w-[720px] xl:max-w-[822px] flex flex-col justify-between\n          items-center gap-[26px] sm:gap-[28px] md:gap-[30px] lg:gap-[32px] mx-auto mt-[160px] mb-[130px]",
        children: [/* @__PURE__ */ jsx("p", {
          className: "bg-[#DFEDE3] rounded-[999px] py-[6px] px-[22px] lg:py-[8px] lg:px-[24px] max-w-[227px] font-manrope\n            font-semibold text-[15px] sm:text-[17px] lg:text-[18px] xl:text-[20px] text-[#0F4E23]",
          children: "Why casa different"
        }), /* @__PURE__ */ jsx("h3", {
          className: "font-roboto font-extrabold text-[32px] sm:text-[37px] md:text-[48px] lg:text-[54px] xl:text-[56px] leading-[54px]\n             sm:leading-[60px] md:leading-[64px] lg:leading-[68px] text-[#141414] text-center max-w-[330px] sm:max-w-[550px] lg:max-w-[580px] xl:max-w-[612px]",
          children: "Why CASA Stands Out from the Rest"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-[#686868] font-manrope font-normal text-[14px] sm:text-[16px] md:text-[17px] lg:text-[20px] xl:text-[24px] leading-[28px]\n             sm:leading-[30px] md:leading-[33px] lg:leading-[36px] text-center",
          children: "Empowering businesses with faster cash access, CASA provides a secure, fast, and flexible solution to get early payments for credit card sales."
        })]
      })
    })]
  });
};
const Home$1 = UNSAFE_withComponentProps(Home);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home$1,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [{
    title: "About"
  }, {
    name: "About",
    content: "Welcome to facto"
  }];
}
const About = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "flex min-h-screen items-center justify-center  w-full",
    children: /* @__PURE__ */ jsx("h1", {
      children: "About"
    })
  });
};
const About$1 = UNSAFE_withComponentProps(About);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About$1,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const Layout$1 = UNSAFE_withComponentProps(function AuthLayout() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout$1
}, Symbol.toStringTag, { value: "Module" }));
function meta$2() {
  return [{
    title: "Login"
  }, {
    name: "Login",
    content: "Welcome to facto"
  }];
}
const Login = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "flex min-h-screen items-center justify-center  w-full",
    children: /* @__PURE__ */ jsx("h1", {
      children: "Login"
    })
  });
};
const Login$1 = UNSAFE_withComponentProps(Login);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login$1,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1() {
  return [{
    title: "Sign Up"
  }, {
    name: "Sign Up",
    content: "Welcome to facto"
  }];
}
const Register = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "flex min-h-screen items-center justify-center  w-full",
    children: /* @__PURE__ */ jsx("h1", {
      children: "Sign Up"
    })
  });
};
const Register$1 = UNSAFE_withComponentProps(Register);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const Layout = UNSAFE_withComponentProps(function BaseLayout2() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "facto"
  }, {
    name: "Account",
    content: "Welcome to facto"
  }];
}
const Account = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "flex min-h-screen items-center justify-center  w-full",
    children: /* @__PURE__ */ jsx("h1", {
      children: "Account"
    })
  });
};
const Account$1 = UNSAFE_withComponentProps(Account);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Account$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/facto-mentor-project-mainassets/entry.client-Da7bo4Kf.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/facto-mentor-project-mainassets/root-DnKCLLAz.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": ["/facto-mentor-project-mainassets/root-olIQ6_nf.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/public/Layout": { "id": "pages/public/Layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/facto-mentor-project-mainassets/Layout-CvQLZAc4.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/public/Home": { "id": "pages/public/Home", "parentId": "pages/public/Layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/facto-mentor-project-mainassets/Home-QSokmJaH.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/public/About": { "id": "pages/public/About", "parentId": "pages/public/Layout", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/facto-mentor-project-mainassets/About-CK3wPsOs.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/auth/Layout": { "id": "pages/auth/Layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/facto-mentor-project-mainassets/Layout-CyM8b9IY.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/auth/Login": { "id": "pages/auth/Login", "parentId": "pages/auth/Layout", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/facto-mentor-project-mainassets/Login-D7pd9t8q.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/auth/Register": { "id": "pages/auth/Register", "parentId": "pages/auth/Layout", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/facto-mentor-project-mainassets/Register-NT37OydF.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/private/Layout": { "id": "pages/private/Layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/facto-mentor-project-mainassets/Layout-B_Fmim5e.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/private/Account": { "id": "pages/private/Account", "parentId": "pages/private/Layout", "path": "account", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/facto-mentor-project-mainassets/Account-vs4PqvKF.js", "imports": ["/facto-mentor-project-mainassets/chunk-OIYGIGL5-bG3474qD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/facto-mentor-project-mainassets/manifest-a647cf70.js", "version": "a647cf70", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/facto-mentor-project-main";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "pages/public/Layout": {
    id: "pages/public/Layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "pages/public/Home": {
    id: "pages/public/Home",
    parentId: "pages/public/Layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "pages/public/About": {
    id: "pages/public/About",
    parentId: "pages/public/Layout",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "pages/auth/Layout": {
    id: "pages/auth/Layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "pages/auth/Login": {
    id: "pages/auth/Login",
    parentId: "pages/auth/Layout",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "pages/auth/Register": {
    id: "pages/auth/Register",
    parentId: "pages/auth/Layout",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "pages/private/Layout": {
    id: "pages/private/Layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "pages/private/Account": {
    id: "pages/private/Account",
    parentId: "pages/private/Layout",
    path: "account",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
