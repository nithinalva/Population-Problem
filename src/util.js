export const sortdata=data=>{

    const sordatedData=[...data]

    return sordatedData.sort((a,b)=>a.population>b.population? -1:1)
}