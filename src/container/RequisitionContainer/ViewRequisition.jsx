import ViewRequisitionTable from "../../components/Table/ViewRequisitionTable";
import { useData } from "../../context/DatabaseContext";

export default function ViewRequisition() {
  let { req } = useData();
  return (
    <>
      <ViewRequisitionTable data={req} />
    </>
  );
}
