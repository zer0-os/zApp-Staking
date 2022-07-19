import { FC } from "react";

import PoolRow from "./PoolRow";
import { COLUMNS, PoolTableData } from "./Pools.helpers";

import AsyncTable from "zero-ui/src/components/AsyncTable";

interface PoolTableProps {
  data: PoolTableData[];
}

const PoolTable: FC<PoolTableProps> = ({ data }) => (
  <AsyncTable
    data={data}
    itemKey="address"
    columns={COLUMNS}
    rowComponent={(data) => <PoolRow rowData={data} />}
    gridComponent={(data: PoolTableData) => <></>}
    searchKey={{ key: "address", name: "message" }}
  />
);

export default PoolTable;
