import {useEffect, useState,} from "react";

const fetchData = async (page, pageSize) => {
    const response = await fetch(`https://example.com/api/data?page=${page}&pageSize=${pageSize}`);
    const data = await response.json();
    const totalCount = response.headers.get('X-Total-Count');
    return { data, totalCount };
};

export const PaginatedList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchPage = async () => {
            const { data, totalCount } = await fetchData(currentPage, pageSize);
            setData(data);
            setTotalCount(totalCount);
        };
        fetchPage();
    }, [currentPage, pageSize]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={totalCount}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
            />
        </>
    );
};

// đây là code cho back end phan trang //

// @GetMapping("/items")
// public ResponseEntity<List<Item>> getItems(
//     @RequestParam(defaultValue = "0") int page,
// @RequestParam(defaultValue = "10") int size
// ) {
//     Pageable paging = PageRequest.of(page, size);
//
//     Page<Item> items = itemRepository.findAll(paging);
//
//     HttpHeaders headers = new HttpHeaders();
//     headers.add("X-Total-Count", String.valueOf(items.getTotalElements()));
//
//     return ResponseEntity.ok()
//         .headers(headers)
//         .body(items.getContent());
// }