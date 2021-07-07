export const sortdata=(data,limit=0)=>{

    const sordatedData=[...data].filter((pop)=>pop.population>=limit)

    // return sordatedData.sort((a,b)=>a.population>b.population? -1:1)
   return sordatedData
}