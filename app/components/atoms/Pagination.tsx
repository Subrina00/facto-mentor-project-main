import { useEffect, useState, type JSX } from "react";

interface PaginationProps {
  totalItems: number | undefined;
  itemsPerPage: number;
  maxVisiblePages: number;
  pageSize?: number;
  currentPageNum?: number;
  onSubmit: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  maxVisiblePages,
  onSubmit,
  pageSize,
  currentPageNum,
}) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const pageNumber = parseInt("1", pageSize ? pageSize : 10);
    const calculatedTotalPages = Math.ceil((totalItems ?? 0) / itemsPerPage);
    setCurrentPage(currentPageNum ? currentPageNum : pageNumber);
    setTotalPages(calculatedTotalPages);
  }, [totalItems, itemsPerPage, currentPageNum]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // setSearchParams({ page: String(pageNumber) });
      // navigate(`?page=${encodeURIComponent(pageNumber)}`);
      onSubmit(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    const classes =
      "flex items-center justify-center cursor-pointer max-w-[26px] min-w-[26px] h-[26px] sm:max-w-[30px] sm:h-[30px] sm:min-w-[30px] xl:max-w-[34px] xl:h-[34px] xl:min-w-[34px] font-onest text-[13px] sm:text-[15px] xl:text-[16px] leading-[16px] text-black sm:leading-[18px] font-light bg-transparent rounded-full";
    const activeClass =
      "flex items-center justify-center max-w-[26px] min-w-[26px] h-[26px] sm:max-w-[30px] sm:h-[30px] sm:min-w-[30px] xl:max-w-[34px] xl:h-[34px] xl:min-w-[34px] bg-primary border-[1px] border-primary z-10 font-onest text-[#081E37] text-[13px] sm:text-[15px] xl:text-[16px] font-light leading-[16px] sm:leading-[18px] text-white rounded-full";
    const visiblePages = maxVisiblePages;

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={`page-${i}`}
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? activeClass : classes}
          >
            {i}
          </button>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
      let endPage = Math.min(
        currentPage + Math.floor(visiblePages / 2),
        totalPages
      );
      if (currentPage <= 2) {
        startPage = 1;
        endPage = Math.min(visiblePages, totalPages);
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={`page-${i}`}
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? activeClass : classes}
          >
            {i}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex sm:flex-1 sm:items-center sm:justify-between">
        <nav
          className="isolate inline-flex -space-x-px rounded-full gap-[8px] sm:gap-[10px]"
          aria-label="Pagination"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center max-w-[26px] min-w-[26px] h-[26px] sm:max-w-[30px] sm:h-[30px] sm:min-w-[30px] xl:max-w-[34px] xl:h-[34px] 
            xl:min-w-[34px] text-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer disabled:cursor-not-allowed border-[1px] border-[#081E37] rounded-full outline-none 
            opacity-100 disabled:opacity-50"
          >
            <span className="hidden">Previous</span>
            <svg
              className="min-w-[20px] max-w-[20px] h-[20px] sm:min-w-[22px] sm:max-w-[22px] sm:h-[22px] xl:min-w-[24px] xl:max-w-[24px] xl:h-[24px] fill-none"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 6.00005C15 6.00005 9.00001 10.419 9 12.0001C8.99999 13.5812 15 18 15 18"
                className="stroke-[#081E37]"
                style={{
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }}
              />
            </svg>
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center rounded-full max-w-[26px] min-w-[26px] h-[26px] sm:max-w-[30px] sm:h-[30px] sm:min-w-[30px] xl:max-w-[34px]
             xl:h-[34px] xl:min-w-[34px] text-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 border-[1px] border-[#081E37] disabled:cursor-not-allowed outline-none
              opacity-100 disabled:opacity-50"
          >
            <span className="hidden">Next</span>
            <svg
              className="min-w-[20px] max-w-[20px] h-[20px] sm:min-w-[22px] sm:max-w-[22px] sm:h-[22px] xl:min-w-[24px] xl:max-w-[24px] xl:h-[24px] fill-none"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 6.00005C9 6.00005 15 10.419 15 12.0001C15 13.5812 9 18 9 18"
                className="stroke-[#081E37]"
                style={{
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }}
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
