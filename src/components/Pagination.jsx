// eslint-disable-next-line react/prop-types
const Pagination = ({ totalPages = 10, currentPage = 1, onPageChange }) => {
  const pageNumbers = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage < 3) {
      pageNumbers.push(1, 2, 3, '...', totalPages);
    } else if (currentPage > totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage, '...', totalPages);
    }
  }

  const buttonClasses = (isDisabled, isActive) =>
    `mx-1 rounded border px-3 py-2 ${
      isDisabled ? 'cursor-not-allowed bg-gray-300' : 'hover:bg-gray-200'
    } ${isActive ? 'bg-blue-500 text-white' : ''}`;

  return (
    <nav className='my-4 flex justify-center'>
      <ul className='flex list-none'>
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={buttonClasses(currentPage === 1)}
          >
            &laquo; {/* HTML entity for double left arrow */}
          </button>
        </li>
        {pageNumbers.map((number, index) =>
          number === '...' ? (
            <li
              key={`ellipsis-${index}`}
              className='mx-1 px-3 py-2 text-gray-500'
            >
              {number}
            </li>
          ) : (
            <li key={`page-${number}`}>
              <button
                onClick={() => onPageChange(number)}
                className={buttonClasses(false, currentPage === number)}
              >
                {number}
              </button>
            </li>
          )
        )}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={buttonClasses(currentPage === totalPages)}
          >
            &raquo; {/* HTML entity for double right arrow */}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
