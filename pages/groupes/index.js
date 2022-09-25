import Head from "next/head";
import { useApi } from "../../axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HeaderText } from "../../components/layout";
import { TableGroup } from "../../components/table";
import { EmptyGroupTable } from "../../components/groupes";

function Groupes() {
  const [groups, setGroups] = useState([]);
  const [readyData, setReadyData] = useState(false);
  const { getAllGroups } = useApi();
  const { session } = useSession();

  useEffect(async () => {
    const Groups = await getAllGroups();
    if (Groups.data.length !== 0) {
      setGroups(Groups.data);
    }
    setReadyData(true);
  }, [session]);

  console.log(groups.length === 0);
  return (
    <>
      <Head>
        <title>Groupes</title>
      </Head>
      <HeaderText text={"Liste avec tous les groupes"} />
      {readyData &&
        (groups.length === 0 ? (
          <EmptyGroupTable />
        ) : (
          <TableGroup datas={groups} />
        ))}
    </>
  );
}

Groupes.layout = "GlobalLayout";
export default Groupes;
