const ComponentOne = ()=>{
    const d = document
    const $question = d.getElementById('question'),
        $options = d.getElementById('options'),
        $time = d.getElementById('time'),
        $score = d.getElementById('score'),
        $btnPlay = d.getElementById('btnPlayComponentOne'),
        $btnOver = d.getElementById('btnOverComponentOne'),
        $loader = d.getElementById('loaderComponentOne'),
        fragment = d.createDocumentFragment()
        
    let loaderState = 'Inactive'
    let questions = []
    const activeLoader = ()=>{
        $loader.classList.remove('none')
        $loader.classList.add('inlineBlock')
        loaderState = 'Loading...'
    }
    const inactiveLoader = ()=>{
        $loader.classList.remove('inlineBlock')
        $loader.classList.add('none')
        loaderState = 'Full Load'
    }
    const getQuestions = (url)=>{
        fetch(url).then((res)=>{
            console.log(res)
            return res.ok ? res.json() : Promise.reject(res)
        })
        .then((res)=>{
            console.log(res)
            let answers = res.preguntas
            answers.forEach(el => {
                questions.push(el)
            });
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    // const RenderQuestions = (arrayData)=>{

    //     let arrayIds = []; // Arreglo para llenar
    //     let totalQuestions = 5; // Cantidad de números en el arreglo
    //     let maxId = 5; // Máximo valor de los números en el arreglo
        
    //     function getArrayRandom (array){
    //         let number = Math.floor(Math.random()*maxId);
    //         // some : al menos un elemento cumpla con la condición su valor será true
    //         if(!array.some(function(e){return e == number})){
    //             /** 
    //              * Si no se encuentra el valor aleatorio en el arreglo
    //              * se pushea el valor.
    //              */ 
    //              array.push(number);
    //         }
    //     }

    //     while(arrayIds.length < totalQuestions && totalQuestions < maxId){
    //         getArrayRandom(arrayIds);
    //         console.log(arrayIds)
    //     }

    //     console.log(arrayIds)
    // }
    
    // Primer event
    d.addEventListener('click', (e)=>{
        e.preventDefault()
        if(e.target === $btnPlay){
            activeLoader()
            console.log(`Despues del event click el valor del estado respuesta es: ${loaderState}`)
            $btnOver.classList.remove('none')
            $btnPlay.classList.add('none')
            
            setTimeout(() => {
                inactiveLoader()
                if(loaderState === 'Full Load'){
                    console.log(`El valor del estado de la respuesta final es: ${loaderState}`)
                    loaderState = 'Inactive'
                    getQuestions("http://127.0.0.1:5500/json/questions.json")
                    console.log(questions)
                    // RenderQuestions(questions)
                }
            }, 1000);

        }
        if(e.target === $btnOver){
            $btnPlay.classList.remove('none')
            $btnOver.classList.add('none')
        }
    })
}

export{ComponentOne}