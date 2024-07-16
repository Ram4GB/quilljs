import QuillJs from "@/components/QuillJs";
import WrapSSR from "@/components/WrapSSR";
import defaultValues from "@/mocks/defaultValues";

export default async function Home() {
  return (
    <WrapSSR>
      <QuillJs defaultDeltaValues={defaultValues} />
    </WrapSSR>
  );
}
