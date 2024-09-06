//Data from the firebas
import { db } from '../firebaseconfig';
import { collection, onSnapshot,addDoc,setDoc,doc } from "firebase/firestore";
import { useState, useEffect } from "react";





export default function Graph() { 
  const studentInfo = collection(db, "Course_Completed");
  const [nodeData, setNodeData] = useState([]);
  const [edgeData,setEdgeData]=useState([]);


  // useEffect for loading the data
  useEffect(() => {
    const gettingNode = onSnapshot(studentInfo, (snapshot) => {
      try {
        const data = snapshot.docs.map((doc) => doc.data().node_list);
        const items = data.length > 0 ? data[0] : []; // Assuming 'list' is an array field

        setNodeData(items);
        console.log("Fetched data:", items);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    });
    const gettingEdge=onSnapshot(studentInfo,(snapshot)=>{
        try{
            const data=snapshot.docs.map((doc)=>doc.data().edge_list);
            const items=data.length>0?data[0]:[];
            setEdgeData(items);
        }catch(error){
            console.log(error)
        }
    })

    // Clean up the listener when the component unmounts
    return () => {
        gettingNode();
        gettingEdge();
    };
  }, []);

    const [predict, setPredict]=useState('')

  useEffect(()=>{
    const Predict = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "age": 12,
                "gender": "Male",
                "coursecount": 2,
                "timespent": 230,
                "loginstreak": 18,
                "score": 10,
                "codingsolved": 12,
                "skilllevel": "Beginner"
            })
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setPredict(data.result)
            
          } else {
            console.error('Failed to fetch disturbance status');
          }
        } catch (error) {
          console.error('Error fetching disturbance status:', error);
        }
      };
    Predict()
  },[])
  
  //useEffec for the graph
  useEffect(() => {
    const nodeDataSet = new window.vis.DataSet(nodeData);
    const edgeDataSet = new window.vis.DataSet(edgeData);
    const container = document.getElementById('container');

    const data = {
      nodes: nodeDataSet,
      edges: edgeDataSet,
    };

    const options = {};
    const network = new window.vis.Network(container, data, options);
  }, [nodeData,edgeData]); // Empty dependency array to ensure the effect runs once
  //function to add a new node
async function addNewNode(newcourse,nodeToBeUpdated="UhtlgIWBsIG2IltRqHpM"){
    try{
        const newNode={id:nodeData.length+1,label:newcourse}
        setNodeData(old=>[...old,newNode])
        
        const newEdge={from:edgeData[edgeData.length-1]?.to||0,to:newNode.id}
        setEdgeData(old=>[...old,newEdge])
        const doc=doc(studentInfo,nodeToBeUpdated)
        await setDoc(doc,{node_list:[...nodeData,newNode],edge_list:[...edgeData,newEdge]})
    }
    catch(error){
        console.log(error)
    }
  }
  return (
    <div className='w-full'>
      <h1 className='text-xl text-white ml-4 font-bold'>Graph Visualization</h1>
      <button onClick={()=>addNewNode("function")}>add</button>
      <div id="container" style={{ width: '100%', height: '600px' }}>

      </div>
        <div className='text-white font-bold text-3xl text-center'>
            MIMI AI Predicts
            <div className='text-white font-semibold text-xl text-center'>
{predict}
            </div>
        </div>
    </div>
  )
}