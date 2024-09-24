let cookie = "";
const user = {
  luci_username: "root",
  luci_password: "root",
};

const getData = async () => {
  const res = await fetch(
    "http://192.168.1.123/cgi-bin/luci/istore/u/network/statistics/",
    {
      headers: {
        cookie,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  if (!data?.result) {
    throw new Error("No data");
  }

  return data;
};

export async function GET() {
  try {
    const data = await getData();
    return Response.json(data);
  } catch (error) {
    const res = await fetch("http://192.168.1.123/cgi-bin/luci/", {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      redirect: "manual",
      body: `luci_username=${user.luci_username}&luci_password=${user.luci_password}`,
      method: "POST",
    });
    cookie = res.headers.get("Set-Cookie") || "";
    const data = await getData();
    return Response.json(data);
  }
}
