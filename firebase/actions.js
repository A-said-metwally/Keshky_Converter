import {collection, getDocs, query, where} from 'firebase/firestore'
import {db} from '../firebase/init-firebase'
import XLSX from 'xlsx'


const matrixRef = collection(db, 'matrix')
const targetsRef = collection(db, 'targets')
const resultsRef = collection(db, 'results')
const suppliersRef = collection(db, 'suppliers')
const billsRef = collection(db , 'bills')

// fetch all users data
export const fetchAllUsersData = async (f)=>{
    await getDocs(usersRef)
    .then(res => {
        let userData = res.docs.map(doc =>(
            {
                id:doc.id,
                data:doc.data()
            }
        ))
        return userData
    })
    .then(userInfo =>{ f(userInfo) })
    .catch(error => console.log("users fetch error", error.message))
}

// fetch user data
export const fetchUserData = async (userCode, f)=>{
    let q = query(usersRef, where("Code", "==" , userCode))
    await getDocs(q)
    .then(res => {
        let userData = res.docs.map(doc =>(
            {
                id:doc.id,
                data:doc.data()
            }
        ))
        return userData
    })
    .then(userInfo =>{ f(userInfo)})
    .catch(error => console.log("user fetch error", error.message))
}

// fetch items function
export const fetchItems = async (f)=>{
    await getDocs(itemsRef)
    .then(res => {
        let itemsData = res.docs.map(doc =>(
            {
                id:doc.id,
                data:doc.data()
            }
        ))
        return itemsData
    })
    .then(itemsInfo =>{f(itemsInfo.map((info)=>(info.data)))})
    .catch(error => console.log("items fetch error", error.message))
}

// fetch customers function
export const fetchCustomers = async (f)=>{
    await getDocs(customersRef)
    .then(res => {
        let customersData = res.docs.map(doc =>(
            {
                id:doc.id,
                data:doc.data()
            }
        ))
        return customersData
    })
    .then(customersInfo =>{f(customersInfo.map((info)=>(info.data)))})
    .catch(error => console.log("customer fetch error", error.message))
}

// fetch suppliers function
export const fetchSuppliers = async (f)=>{
    await getDocs(suppliersRef)
    .then(res => {
        let suppliersData = res.docs.map(doc =>(
            {
                id:doc.id,
                data:doc.data()
            }
        ))
        return suppliersData
    })
    .then(suppliersInfo =>{f(suppliersInfo.map((info)=>(info.data)))})
    .catch(error => console.log("customer fetch error", error.message))
}

// fetch bills function
export const fetchBills = async (f)=>{
    await getDocs(billsRef)
    .then(res => {
        let billsData = res.docs.map(doc =>(
            {
                id:doc.id,
                data:doc.data()
            }
        ))
        return billsData
    })
    .then(billsInfo =>{f(billsInfo.map((info)=>(info.data)))})
    .catch(error => console.log("bills fetch error", error.message))
}

// export excel
export const handleExportExcel = (data, title)=>{
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(data);
  
    XLSX.utils.book_append_sheet(wb, ws, 'worksheet' )
        XLSX.writeFile(wb, `${title}.xlsx` )
  }
  

//   *******************************************

export const addProject = async (data)=>{
    await fetch('/api/projects',{
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
    })
}

export const addScenario = async (data)=>{
    const response = await fetch('/api/chat',{
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
    })
    const res = await response.json()
    return res
}

export const fetchProjects = async (f)=>{
    const projectsCollection = collection(db , 'projectsDb')

    await getDocs(projectsCollection)
    .then(res => {
        let projectsData = res.docs.map(doc =>(
            {
                id:doc.id,
                ...doc.data()
            }
        ))
        return projectsData
    })
    .then(projectsInfo =>{f(projectsInfo.map((info)=>{return info}))})
    // .then(projectsInfo =>{setProjects(projectsInfo.map((info)=>{return info}))})
    .catch(error => console.log("projects fetch error", error.message))
}


export const fetchChat = async (p, f)=>{
    const chatCollection = collection(db , 'chatDb')

    let q = query(chatCollection, where("projectName", "==" , p))

    await getDocs(q)
    .then(res => {
        let chatData = res.docs.map(doc =>(
            {id:doc.id, ...doc.data()}
        ))
        return chatData
    })
    .then(chatInfo =>{ f(chatInfo.map((info)=>{return info}))})
    .catch(error => console.log("chat fetch error", error.message))
}


