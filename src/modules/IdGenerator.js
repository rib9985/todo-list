
export default function idGenerator(){
const id = () => Math.floor(Math.random()*100000).toString()
return id()
}

const newId = idGenerator()
console.log(newId)