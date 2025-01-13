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

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.button}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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