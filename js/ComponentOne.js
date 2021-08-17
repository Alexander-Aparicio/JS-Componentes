const ComponentOne = ()=>{
    const d = document
    const $theme = d.getElementById('theme'),
        $question = d.getElementById('question'),
        $options = d.getElementById('options'),
        $resOp1 = d.getElementById('resop1'),
        $resOp2 = d.getElementById('resop2'),
        $resOp3 = d.getElementById('resop3'),
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
        $option1 = d.getElementById('liop1'),
        $option2 = d.getElementById('liop2'),
        $option3 = d.getElementById('liop3')
         
    let randomNumberArray = []
    let questions = []
    let options = []
    let points = 0
    const player = []
    let i = 0

    const activeLoader = ()=>{
        $loader.classList.remove('none')
        $loader.classList.add('inlineBlock')
        $option1.classList.add('none')
        $option2.classList.add('none')
        $option3.classList.add('none')
        $question.classList.add('none')
    }
    const inactiveLoader = (time)=>{
        setTimeout(()=>{
            $loader.classList.remove('inlineBlock')
            $loader.classList.add('none')
            enableContainers($option1,$option2,$option3,$question)
        },`${time}000`)

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
    const enableContainers = (answer1,answer2,answer3,question)=>{
        if(answer1.classList.contains('none')){answer1.classList.remove('none')}
        if(answer2.classList.contains('none')){answer2.classList.remove('none')}
        if(answer3.classList.contains('none')){answer3.classList.remove('none')}
        if(question.classList.contains('none')){question.classList.remove('none')}
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
    const renderPlayer = ()=>{
        $playerName.textContent = $player.value
    }
    const renderQuestions = (arrayRandom,arrayQuestions,i)=>{
        if(i< arrayRandom.length){
            let answerId = arrayRandom[i]

            function condition(el){return parseInt(el.id)  === answerId}
            const questionObject = arrayQuestions.find(condition)
            $question.textContent = questionObject.pregunta 
        }
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
    const validationRecord = (inputName,inputEmail,record)=>{
        return new Promise((resolve,reject)=>{

            setTimeout(()=>{
                if(inputName.value && inputEmail.value){
                    resolve(record.classList.add('none'))
                }else{reject('Resgistrate para poder Jugar')}
            },100)
        })
    }
    const evaluation = (objectOptions,idOption,arrayRandom,i)=>{

        if(i< arrayRandom.length){
            const idOpciones = arrayRandom[i]
            console.log(`Estoy dentro de evaluation ${idOpciones}`)
            function filtration (el){return parseInt(el.id)===idOpciones}
            const objectOpciones = objectOptions.find(filtration)
            const opcionesDeRespuesta = objectOpciones.opciones
            console.log(opcionesDeRespuesta)
            console.log(idOption)
            function filtro (el){return el.id=== `${idOption}`}
            const opcionEvaluar = opcionesDeRespuesta.find(filtro)
            console.log(`Estoy dentro de evaluation ${opcionEvaluar} , ${opcionEvaluar.rpta}`)
            const functionEvaluation = ()=>{
                if(opcionEvaluar.rpta === 'true'){
                    d.getElementById(`res${idOption}`).textContent = "✔️"
                    points=points+10
                    $score.textContent = points
                }
                if(opcionEvaluar.rpta === 'false'){
                    d.getElementById(`res${idOption}`).textContent = "✖️"
                }
            }
            functionEvaluation()
        }
  
    }
    const chronometro = (countDown,element)=>{
        element.textContent = countDown
        let times = countDown-1
        let cronos = setInterval(() => {
            let contador = times--
            element.textContent = contador
        }, 1000)
        setTimeout(() => {
            element.textContent = ""
            clearInterval(cronos)
            if($question.value != "¡Felicitaciones terminaste! 🎉"){
                $question.textContent = "¡Se terminó su tiempo! 🎉"
            }
            while($options.hasChildNodes()){
            $options.removeChild($options.firstChild)
            }
        }, `${countDown}000`)
    }
    const next = ()=>{
        if(i<randomNumberArray.length){
            i = i+1
            renderQuestions(randomNumberArray,questions,i)
            renderAnswer(randomNumberArray,options,i)
        }
        if(i>=randomNumberArray.length){
            $time.classList.add('none')
            gameOver()
        }
    }
    const newQuestion = (opcion1,opcion2,opcion3,question,resop)=>{
        setTimeout(() => {
            resop.textContent = ""
            enableContainers(opcion1,opcion2,opcion3,question)
            next()
        }, 1000);
    }
    const gameOver = ()=>{

        $time.textContent = "Felicitaciones"
        $question.textContent = "¡Felicitaciones terminaste! 🎉"
        while($options.hasChildNodes()){
            $options.removeChild($options.firstChild)
        }
    }

    // Primer event
    d.addEventListener('click', async (e)=>{

        e.preventDefault()
        if(e.target === $btnPlay){
            $btnOver.classList.remove('none')
            $btnPlay.classList.add('none')
            $recordPlayer.classList.remove('none')
            $record.classList.add('transition')
        }

        if(e.target === $btnRecord){

            await validationRecord($player,$email,$recordPlayer)
            activeLoader()
            await getQuestions("http://127.0.0.1:5500/json/questions.json",questions)
            await getOptions("http://127.0.0.1:5500/json/answers.json",options)
            await arrayRandomPromise(randomNumberArray,5,4)
            inactiveLoader(0)
            renderPlayer()
            enableContainers($option1,$option2,$option3,$question)
            renderQuestions(randomNumberArray,questions,i)
            renderAnswer(randomNumberArray,options,i)
            chronometro(25,$time)
             
            $option1.addEventListener('click',()=>{
 
                $option2.classList.add('none')
                $option3.classList.add('none')
                evaluation(options,'op1',randomNumberArray,i)
                newQuestion($option1,$option2,$option3,$question,$resOp1)
            })

            $option2.addEventListener('click',()=>{
                
                $option1.classList.add('none')
                $option3.classList.add('none')
                evaluation(options,'op2',randomNumberArray,i)
                newQuestion($option1,$option2,$option3,$question,$resOp2)
            })

            $option3.addEventListener('click',()=>{
    
                $option1.classList.add('none')
                $option2.classList.add('none')
                evaluation(options,'op3',randomNumberArray,i)
                newQuestion($option1,$option2,$option3,$question,$resOp3)
            })
        }
     
        if(e.target === $btnOver){
            location.reload()
        }
    })   
}

export{ComponentOne}