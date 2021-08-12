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
    let randomNumberArray = []
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
    const arrayOfDistinctRandomNumbers = (arrayLength,maxValue)=>{

        if( (arrayLength-1) <= maxValue){

            do {

                let randomNumber = Math.floor(Math.random()*(maxValue+1))
                let condition = (el)=>{return el == randomNumber}
                let validNumber = !randomNumberArray.some(condition)

                if(validNumber){
                    randomNumberArray.push(randomNumber)    
                }
                    
            }
            while (randomNumberArray.length < arrayLength)

            console.log(`Arreglo con "${randomNumberArray.length}" valores`)
            console.log(`Arreglo aleatorio solicitado : ${randomNumberArray}`) 

        }else{
            console.log('arrayLength cannot be greater than maxValue')
        }
             
    }
    const getQuestions = (url)=>{
        fetch(url).then((res)=>{
            console.log(res)
            return res.ok ? res.json() : Promise.reject(error)
        })
        .then((res)=>{
            console.log(res)
            let answers = res.preguntas
            console.log(answers)
            answers.forEach(el => {
                questions.push(el.pregunta)
            })
            let tematica = res.tema
            d.getElementById('theme').textContent = tematica
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    

    // Primer event
    d.addEventListener('click', async(e)=>{
        e.preventDefault()
        if(e.target === $btnPlay){
            activeLoader()
            console.log(`Despues del event click el valor del estado respuesta es: ${loaderState}`)
            $btnOver.classList.remove('none')
            $btnPlay.classList.add('none')
            arrayOfDistinctRandomNumbers(5,5)
            console.log(randomNumberArray)
            
            setTimeout(() => {
                inactiveLoader()
                if(loaderState === 'Full Load'){
                    console.log(`El valor del estado de la respuesta final es: ${loaderState}`)
                    loaderState = 'Inactive'
                    getQuestions("http://127.0.0.1:5500/json/questions.json")
                    
                }
            }, 1000);
            setTimeout(() => {
                console.log(questions)
                const renderAnswer = ()=>{
                    let answerId = randomNumberArray[0]
                    console.log(answerId)
                    let answerObject = questions[answerId]
                    console.log(answerObject)
                }
                renderAnswer()
            }, 3000);
            


        }
        if(e.target === $btnOver){
            $btnPlay.classList.remove('none')
            $btnOver.classList.add('none')
        }
    })
}

export{ComponentOne}