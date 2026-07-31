import React from "react";


const Users =()=>{


const users=[

{
id:1,
name:"Fatima Tahir",
email:"fatima@gmail.com",
role:"Customer"
},

{
id:2,
name:"Ali Khan",
email:"ali@gmail.com",
role:"Customer"
},

{
id:3,
name:"Admin",
email:"admin@scriblia.com",
role:"Admin"
}


];



return(


<div className="min-h-screen bg-gray-100 p-10">


<h1 className="text-3xl font-semibold mb-8">
Users Management
</h1>



<div className="bg-white p-6 rounded-xl shadow">


<table className="w-full text-left">


<thead>

<tr className="border-b">


<th className="p-3">
ID
</th>


<th className="p-3">
Name
</th>


<th className="p-3">
Email
</th>


<th className="p-3">
Role
</th>


<th className="p-3">
Action
</th>


</tr>


</thead>



<tbody>


{
users.map(user=>(


<tr 
key={user.id}
className="border-b"
>


<td className="p-3">
{user.id}
</td>


<td className="p-3">
{user.name}
</td>


<td className="p-3">
{user.email}
</td>


<td className="p-3">


<span
className={`
px-3 py-1 rounded-full text-sm

${
user.role==="Admin"
?
"bg-purple-100 text-purple-600"
:
"bg-blue-100 text-blue-600"

}

`}
>

{user.role}

</span>


</td>



<td className="p-3">

<button
className="text-red-500"
>
Delete
</button>

</td>



</tr>


))

}



</tbody>


</table>



</div>


</div>


);


};


export default Users;