import {findOne,
     find,
     fetchName,
      randomID,
    fetchID
    } from '@/app/lib/data';

export default function Page() {
    var id = randomID();
    console.log("id:" + id);
    console.log(200);
    console.log("customer name: " + fetchName("customers", id));
    return <div>
        Dashboard
        
    </div>
  }