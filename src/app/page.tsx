import QuillJs from "@/components/QuillJs";

export default async function Home() {
  const data = await fetch(process.env.API_ENDPOINT, { cache: "no-cache" }).then((res) => res.json());

  return <QuillJs defaultDeltaValues={JSON.parse(data[0].value)} />;
}
