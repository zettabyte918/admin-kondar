import Head from "next/head";
import { TableEleve } from "../../components/table";
import { useApi } from "../../axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HeaderText } from "../../components/layout";
import { EmptyStudentTable } from "../../components/eleves";

function Eleves() {
  const [students, setStudents] = useState([]);
  const [readyData, setReadyData] = useState(false);
  const { getAllStudents } = useApi();
  const { session } = useSession();

  useEffect(async () => {
    const Students = await getAllStudents();
    if (Students.data.length !== 0) {
      setStudents(Students.data);
    }
    setReadyData(true);
  }, [session]);

  return (
    <>
      <Head>
        <title>Eleves</title>
      </Head>
      <HeaderText text={"Liste avec tous les élèves"} />
      {readyData &&
        (students.length === 0 ? (
          <EmptyStudentTable />
        ) : (
          <TableEleve datas={students} />
        ))}
    </>
  );
}

Eleves.layout = "GlobalLayout";
export default Eleves;
