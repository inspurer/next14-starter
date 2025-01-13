"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './pagination.module.css';

const Pagination = ({ totalPages, currPage }) => {
    const [currentPage, setCurrentPage] = useState(currPage);
    const router = useRouter();

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`?page=${page}`, undefined, { shallow: true });
    };

    // 计算显示的页码范围
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // 计算显示的页码
    let visiblePages = [];

    if (totalPages <= 3) {
        // 如果总页数小于等于3，显示所有页码
        visiblePages = pageNumbers;
    } else {
        // 计算当前页码的索引
        const currentIndex = currentPage - 1;

        // 计算显示的页码范围
        const start = Math.max(0, currentIndex - 1);
        const end = Math.min(pageNumbers.length, currentIndex + 2);

        // 如果在第一页，显示前3页
        if (currentPage === 1) {
            visiblePages = pageNumbers.slice(0, 3);
        } else if (currentPage === totalPages) {
            // 如果在最后一页，显示最后3页
            visiblePages = pageNumbers.slice(-3);
        } else {
            // 其他情况，显示当前页及其前后各一页
            visiblePages = pageNumbers.slice(start, end);
        }
    }

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.button}
            >
                Previous
            </button>
            {visiblePages.map((page, index) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.button} ${currentPage === page ? styles.active : ''}`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.button}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;