import { render } from "@testing-library/react";
import Pagination from "../components/Pagination";

it('Testing pagination', () => {
    render(<Pagination totalRecords={0} pageLimit={30} pageNeighbours={0} />)
    expect(true).toBeTruthy();
})