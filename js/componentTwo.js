const pruebas=()=>{
    const d = document
    const btn = d.getElementById('eventclick')
    const btn2 = d.getElementById('click2')
    const contenido = d.getElementById('contenido')

    d.addEventListener('click',(e)=>{

        if(e.target === btn){
            console.log('le diste click')
            let i = 0
            const f = (a)=>{
                const functionRender = setInterval(()=>{ 
                    contenido.textContent = i
                    i=i+1
                },1000)
                setTimeout(() => {
                    
                }, `${a}000`);
            }
            f(10)
            
            d.getElementById('click2').addEventListener('click',()=>{
               
                f(0)
                let i = 0
                
                const functionR = setInterval(()=>{ 
                    const functionRender = setInterval(()=>{ 
                        contenido.textContent = i
                        i=i+1
                    },1000)
                },1000)
                
                
              
            })
        }
        
    })
}
export{pruebas}