const ComponentOne = ()=>{
    const d = document
    const $theme = d.getElementById('theme'),
        $question = d.getElementById('question'),
        $options = d.getElementById('options'),
        $time = d.getElementById('time'),
        $recordPlayer = d.getElementById('recordComponentOne'),
        $score = d.getElementById('score'),
        $btnPlay = d.getElementById('btnPlayComponentOne'),
        $btnOver = d.getElementById('btnOverComponentOne'),
        $loader = d.getElementById('loaderComponentOne'),
        $record = d.getElementById('recordComponentOne'),
        $btnRecord = d.getElementById('loginComponentOne'),
        $player = d.getElementById('player'),
        $email = d.getElementById('email'),
        $playerName = d.getElementById('playerName'),
        $option1 = d.getElementById('op1'),
        $option2 = d.getElementById('op2'),
        $option3 = d.getElementById('op3'),
        fragment = d.createDocumentFragment()
        
    let loaderState = 'Inactive'
    let randomNumberArray = []
    let questions = []
    let options = []
    const player = []
    let i = 0

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
    const arrayOfDistinctRandomNumbers = (arrayRandom,arrayLength,maxValue)=>{

        if( (arrayLength-1) <= maxValue){

            do {

                let randomNumber = Math.floor(Math.random()*(maxValue+1))
                let condition = (el)=>{return el == randomNumber}
                let validNumber = !arrayRandom.some(condition)

                if(validNumber){
                    arrayRandom.push(randomNumber)    
                }
                    
            }
            while (arrayRandom.length < arrayLength)

            console.log(`Arreglo con "${arrayRandom.length}" valores`)
            console.log(`Arreglo aleatorio solicitado : ${arrayRandom}`) 

        }else{
            console.log('arrayLength cannot be greater than maxValue')
        }
             
    }

    const arrayRandomPromise = (arrayRandom,arrayLength,maxValue)=>{

        return new Promise((resolve, reject) =>{
            
            arrayOfDistinctRandomNumbers(arrayRandom,arrayLength,maxValue)
            setTimeout(() => {
                if(randomNumberArray.length === arrayLength){
                    resolve (randomNumberArray)
                }else{
                    reject ('No se resolvió la promesa')
                }
            }, 1000); 
        })
    }  
    const getQuestions = (url,array)=>{

        return (
        fetch(url).then((res)=>{
            console.log(res)
            return res.ok ? res.json() : Promise.reject(error)
        })
        .then((res)=>{
            console.log(res)
            let arrayquestions = res.preguntas
            console.log(arrayquestions)
            arrayquestions.forEach(el => {
                array.push(el)
            })
            let tematica = res.tema
            $theme.textContent = tematica
        })
        .catch((error)=>{
            console.log(error)
        })
        )
    }
    const renderQuestions = (arrayRandom,arrayQuestions,i)=>{
        if(i< arrayRandom.length){
            let answerId = arrayRandom[i]

            function condition(el){return parseInt(el.id)  === answerId}
            const questionObject = arrayQuestions.find(condition)
            $question.textContent = questionObject.pregunta 
        }
    } 
    const getOptions = (url,array)=>{

        return (
        fetch(url).then((res)=>{
            console.log(res)
            return res.ok ? res.json() : Promise.reject(error)
        })
        .then((res)=>{
            console.log(res)
            let arrayOptions = res.respuestas
            console.log(arrayOptions)
            arrayOptions.forEach((el)=>{
               array.push(el) 
            })
        })
        .catch((error)=>{
            console.log(error)
        })
        )
    }
    const renderAnswer = (arrayRandom,arrayOptions,i)=>{
        if(i< arrayRandom.length){
            let answerId = arrayRandom[i]
            console.log(i)
            function condition(el){return parseInt(el.id)  === answerId}
            const optionsObject = arrayOptions.find(condition)
            console.log(optionsObject) 
            let packAnswers = optionsObject.opciones
            packAnswers.forEach(el => {
                d.getElementById(`${el.id}`).textContent = el.option
            });
        }
    } 
    
    // Primer event
    d.addEventListener('click', async (e)=>{
        e.preventDefault()
        if(e.target === $btnPlay){

            $btnOver.classList.remove('none')
            $btnPlay.classList.add('none')
            $recordPlayer.classList.remove('none')
            $record.classList.toggle('transition')
        }

        if(e.target === $btnOver){

            $btnPlay.classList.remove('none')
            $btnOver.classList.add('none')
            $record.classList.toggle('transition')

        }

        if(e.target === $btnRecord){

            if($player.value && $email.value){

                activeLoader()
                $recordPlayer.classList.add('none')
                console.log(`Despues del event submit el valor del estado respuesta es: ${loaderState}`)
                await getQuestions("http://127.0.0.1:5500/json/questions.json",questions)
                await getOptions("http://127.0.0.1:5500/json/answers.json",options)
                await arrayRandomPromise(randomNumberArray,5,4)
                inactiveLoader()
                if(loaderState === 'Full Load'){
                    console.log(`El valor del estado de la respuesta final es: ${loaderState}`)
                    loaderState = 'Inactive' 
                    renderQuestions(randomNumberArray,questions,i)
                    renderAnswer(randomNumberArray,options,i)
                    $playerName.textContent = $player.value
                }
            
            }else{

            }

        }
        
        if(e.target === $option1 || e.target === $option2 || e.target === $option3){
            i=i+1
            renderQuestions(randomNumberArray,questions,i)
            renderAnswer(randomNumberArray,options,i)
        }


        if(e.target ===$btnOver){
            location.reload()
        }
    })   
}

export{ComponentOne}