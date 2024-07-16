import QuillJs from "@/components/QuillJs";
import WrapSSR from "@/components/WrapSSR";

export default async function Home() {
  const data = await fetch(process.env.API_ENDPOINT, { cache: "no-cache" }).then((res) => res.json());

  return (
    <WrapSSR>
      <QuillJs defaultDeltaValues={JSON.parse(data[0].value)} />
    </WrapSSR>
  );
}
