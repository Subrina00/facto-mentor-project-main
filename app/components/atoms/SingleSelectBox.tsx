import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type {
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { cn } from "~/lib/utils";

const SingleSelectBox: React.FC<{
  options: any[];
  errors?: boolean;
  setValue?: UseFormSetValue<any>;
  isSelectedItem?: any;
  isEdit?: string;
  placeHolderText?: string;
  fieldName?: any;
  setError?: UseFormSetError<any>;
  isError?: boolean;
  clearErrors?: UseFormClearErrors<any>;
  success?: boolean;
  loadMoreOptions?: (pageSizeUpdate: number, loadMoreType: string) => void;
  pageSizeNum?: number;
  totalNumberData?: number;
  loadMoreTypeMultiSelect?: string;
  isClassName?: string;
  isTopShow?: boolean;
  isDisabled?: boolean;
  isResetData?: boolean;
}> = ({
  options,
  errors,
  isEdit,
  isSelectedItem,
  placeHolderText,
  setValue,
  fieldName,
  isError,
  setError,
  clearErrors,
  success,
  loadMoreOptions,
  pageSizeNum,
  totalNumberData,
  loadMoreTypeMultiSelect,
  isTopShow = false,
  isClassName,
  isDisabled,
  isResetData = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [firstOpen, setFirstOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();

  useEffect(() => {
    if (firstOpen && !selectedItem && isError) {
      setError?.(fieldName, {
        type: "manual",
        message: "*",
      });
    }
  }, [firstOpen, isError]);

  useEffect(() => {
    if (isSelectedItem && isEdit) {
      setSelectedItem(isSelectedItem);
    }
  }, [isEdit, isSelectedItem]);

  const toggleDropdown = (isBooleanData: boolean) => {
    if (!isBooleanData) {
      setFirstOpen(true);
    }
    setIsOpen(isBooleanData);
  };

  const handleSelect = (option: any) => {
    if (option) {
      setValue?.(fieldName, option, { shouldValidate: true });
      setSelectedItem(option);
      setIsOpen(false);

      if (isError) {
        clearErrors?.(fieldName);
      }
    }
  };

  useEffect(() => {
    if (isResetData) {
      setSelectedItem(null);
    }
  }, [isResetData]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll Handler
  const handleScroll = () => {
    if (dropdownRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
      if (totalNumberData !== options.length) {
        if (scrollTop >= scrollHeight - clientHeight) {
          loadMoreOptions?.(
            pageSizeNum as number,
            loadMoreTypeMultiSelect as string
          );
        }
      }
    }
  };

  return (
    <>
      <div className="relative">
        <div
          className={cn(
            `${
              errors
                ? "border-[#E31E27] bg-red-50"
                : "border-[#E2E8F0] bg-white"
            } border py-[10.4px] md:py-[13px] px-[24px] cursor-pointer rounded-[12px] flex flex-wrap gap-2 relative`,
            isClassName && isClassName,
            isDisabled && "pointer-events-none bg-[#f8f9fb]"
          )}
          onClick={() => {
            if (!isDisabled) {
              toggleDropdown(!isOpen);
            }
          }}
        >
          {selectedItem ? (
            <span className="text-[16px]/[20px] font-onest text-black font-light text-left">
              {selectedItem && selectedItem.name}
            </span>
          ) : (
            <span
              className={`text-[16px]/[20px] font-onest ${
                errors ? "text-red-400" : "text-black"
              }`}
            >
              {placeHolderText}
            </span>
          )}

          <svg
            className="min-w-[12px] max-w-[12px] h-[13px] fill-none absolute top-1/2 right-[11px] sm:right-[16px] -translate-y-1/2"
            viewBox="0 0 16 16"
          >
            <g>
              <path
                d="M3.3335 5.66699L8.00016 10.3337L12.6668 5.66699"
                stroke="#9EA3AE"
                className={`${errors ? "stroke-red-400" : "stroke-[#9EA3AE]"}`}
                style={{
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }}
              />
            </g>
          </svg>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                transition={{ ease: "easeInOut", duration: 0.16 }}
                initial={
                  isTopShow
                    ? {
                        translateY: "-8px",
                        opacity: 0,
                        visibility: "hidden",
                      }
                    : {
                        translateY: "8px",
                        opacity: 0,
                        visibility: "hidden",
                      }
                }
                animate={
                  isTopShow
                    ? {
                        opacity: 1,
                        translateY: "-4px",
                        visibility: "visible",
                      }
                    : {
                        opacity: 1,
                        translateY: "4px",
                        visibility: "visible",
                      }
                }
                exit={
                  isTopShow
                    ? { translateY: "-8px", opacity: 0, visibility: "hidden" }
                    : { translateY: "8px", opacity: 0, visibility: "hidden" }
                }
                className={cn(
                  "absolute border border-[#E2E8F0] bg-white w-full rounded-[6px] overflow-hidden shadow-lg z-10",
                  isTopShow ? "bottom-full" : "top-full"
                )}
              >
                {!success ? (
                  <p
                    className={`text-[13px] py-[8px] px-[14px] flex items-center w-full text-left text-[#A4A7AE] justify-between font-onest font-normal `}
                  >
                    Loading...
                  </p>
                ) : (
                  <>
                    {!options.length ? (
                      <p
                        className={`text-[13px] py-[8px] px-[14px] flex items-center w-full text-left text-red-300 justify-between font-onest font-normal `}
                      >
                        No data found.
                      </p>
                    ) : (
                      <>
                        <div
                          className="max-h-[195px] overflow-y-auto"
                          onScroll={handleScroll}
                          ref={dropdownRef}
                        >
                          {options.map((option: any, index: number) => (
                            <button
                              type="button"
                              key={option.id + index}
                              className={`text-[16px]/[20px] cursor-pointer py-[9px] px-[14px] flex items-center w-full text-left text-black justify-between font-onest font-normal `}
                              onClick={() => handleSelect(option)}
                            >
                              <span>{option.name}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </motion.div>
              <motion.div
                transition={{ ease: "easeInOut", duration: 0.1 }}
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                exit={{ opacity: 0, visibility: "hidden" }}
                className="bg-transparent fixed top-0 left-0 w-full h-full inset-0 z-[9]"
                onClick={() => toggleDropdown(!isOpen)}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SingleSelectBox;
