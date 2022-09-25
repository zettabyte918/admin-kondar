import Head from "next/head";
import { useEffect, useState } from "react";
import { Stats } from "../../components/stats";
import { useSession } from "next-auth/react";
import { useApi } from "../../axios";

function Index() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [unpaidStudents, setUnpaidStudents] = useState([]);

  const { countAllStudents, getAllStudentsPayments } = useApi();

  const getCount = async () => {
    return await countAllStudents();
  };

  const getUnpaidStudents = async () => {
    return await getAllStudentsPayments();
  };

  useEffect(async () => {
    if (session?.accessToken) {
      const c = await getCount();
      if (unpaidStudents.length == 0) {
        const unpaid = await getUnpaidStudents();
        setStudents(unpaid.data);
      }
      setCount(c.data);
    }
  }, [session]);

  const getAllUnpaidStudents = () => {
    let dateNowMs = new Date().getTime();
    let unpaid = students.map((student) => {
      if (student.payments.length) {
        let paymentsOldThanNow = student.payments.map((payment) =>
          new Date(payment.fin).getTime()
        );
        let maxDateFin = new Date(Math.max(...paymentsOldThanNow));
        if (maxDateFin < dateNowMs) {
          setUnpaidStudents((prev) => [...prev, student]);
        }
      } else {
        setUnpaidStudents((prev) => [...prev, student]);
      }
    });
  };

  useEffect(() => {
    if (!students) return;
    getAllUnpaidStudents();
  }, [students]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Stats count={count} unpaid={unpaidStudents} />
    </>
  );
}

Index.layout = "GlobalLayout";
export default Index;
