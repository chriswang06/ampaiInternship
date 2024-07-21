import {findOne} from '@/app/lib/data';

export default function Page() {
  console.log(findOne("Walgreens"));
  return <h1>hello</h1>;
}