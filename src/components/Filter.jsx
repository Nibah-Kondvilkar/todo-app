function Filter({setFilter}){

return(

<select
onChange={(e)=>setFilter(e.target.value)}
className="border p-2 rounded"
>

<option value="all">All</option>
<option value="Work">Work</option>
<option value="Study">Study</option>
<option value="Personal">Personal</option>

</select>

);

}

export default Filter;