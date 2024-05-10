<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
onMounted(() => {
    initFlowbite();
})

</script>

<template>
    <!-- waiting state -->
    <template v-if="currentState() === 'waiting'">
        <nav class="bg-indigo-900 h-[100px] flex text-center items-center justify-center p-3">
            <div class="w-full ml-5 mr-5 p-5 grid grid-cols-2 gap-4">
                <div
                    class="min-w-[100px] max-w-[500px] bg-white p-2 rounded-lg shadow-md text-center items-center justify-center flex">
                    <p class="text-lg font-semibold">{{ playerData.name }}</p>
                </div>
                <div class="text-right items-center justify-center p-3">
                    <p class="font-bold text-2xl ml-5 mr-5 text-white"> Score: {{ playerData.score }}
                    </p>
                </div>
            </div>
            <div @click="stateChange">
                <p class="font-bold text-2xl ml-5 mr-5 text-white hover:underline"> next </p>
            </div>
        </nav>
        <div class="max-w-[550px] mt-10 ml-auto mr-auto grid grid-cols-1 gap-4 items-center justify-center">
            <span class="font-bold text-3xl ">Pre-Quiz</span>
            <div class="bg-white p-4 rounded-lg shadow-md items-center justify-center mt-[50px]">
                <div class="flex justify-between p-5">
                    <span class="font-bold ">Quiz name:</span>
                    <span>{{ this.quizData.quiz_name }}</span>
                </div>
                <div class="flex justify-between p-5 mt-2">
                    <span class="font-bold">items:</span>
                    <span>{{ getItems() }} items</span>
                </div>
            </div>
            <div>
                <button type="button" @click="stateChange()">
                    start
                </button>
            </div>
        </div>
    </template>
    <!-- answer state -->
    <template v-if="currentState() === 'answer'">
        <template v-if="overtime">
            <div class="w-full h-[100vh] bg-indigo-100 p-10 overflow-auto flex justify-center items-center">
                <div class="text-center">
                    <div role="status">
                        <svg aria-hidden="true"
                            class="inline w-60 h-60 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="!overtime">
            <nav class="bg-indigo-900 h-[100px] flex text-center items-center justify-center p-3">
                <div class="w-full ml-5 mr-5 p-5 grid grid-cols-2 gap-4">
                    <div
                        class="min-w-[100px] max-w-[500px] bg-white p-2 rounded-lg shadow-md text-center items-center justify-center flex">
                        <p class="text-lg font-semibold">{{ playerData.name }}</p>
                    </div>
                    <div class="text-right items-center justify-center p-3">
                        <p class="font-bold text-2xl ml-5 mr-5 text-white"> Score: {{ playerData.score }} </p>
                    </div>
                </div>
            </nav>
            <div class="w-full h-[calc(100vh-100px)] bg-indigo-100 p-2 ">
                <div class="w-full h-[calc(100vh-100px)] bg-indigo-100 p-2 ">
                    <div class="w-full h-[calc(100vh-150px)] bg-indigo-100  flex justify-center items-center">
                        <div class="w-full h-full grid grid-cols-1 gap-10" v-if="currentQuizState.type == 'Choices'">
                            <span class="text-5xl flex justify-center items-center"> {{ currentQuizState.question }}
                            </span>
                            <div class="w-full h-full p-2 grid grid-cols-2 gap-10"
                                v-if="currentQuizState.type == 'Choices'">
                                <button v-for="(choice, index) in currentQuizState.choices" :key="index"
                                    class="choice-button text-[50px]" @click="Answer(choice)">
                                    {{ choice.value }}
                                </button>
                            </div>
                        </div>
                        <div class="w-full h-full p-5 grid grid-cols-1 gap-10"
                            v-if="currentQuizState.type == 'True-False'">
                            <span class="text-5xl flex justify-center items-center"> {{ currentQuizState.question }}
                            </span>
                            <div class="w-full h-full p-5 grid grid-cols-2 gap-10"
                                v-if="currentQuizState.type == 'True-False'">
                                <button v-for="(choice, index) in currentQuizState.choices" :key="index"
                                    class="choice-button text-[50px]" @click="Answer(choice)">
                                    {{ choice.value }}
                                </button>
                            </div>
                        </div>
                        <div class="max-h-[200px] p-5 grid grid-cols-1" v-if="currentQuizState.type == 'Short Answer'">
                            <span class="text-5xl flex justify-center items-center"> {{ currentQuizState.question
                                }}</span>
                            <textarea
                                class="textboxinput max-h-[300px] p-[10px] border-[2px] border-dashed rounded-[10px] resize-none border-box font-[16px] text-center text-3xl"
                                v-model="currentQuizState.answer.value" placeholder="Enter answer"></textarea>
                            <div>
                                <div @click="Answer(null)">
                                    <p class="font-bold text-2xl ml-5 mr-5 text-indigo-950 hover:underline"> Answer </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </template>
    <!-- correction State -->
    <template v-if="currentState() === 'correction'">
        <nav class="bg-indigo-900 h-[100px] flex text-center items-center justify-center p-3">
            <div class="w-full ml-5 mr-5 p-5 grid grid-cols-2 gap-4">
                <div
                    class="min-w-[100px] max-w-[500px] bg-white p-2 rounded-lg shadow-md text-center items-center justify-center flex">
                    <p class="text-lg font-semibold">{{ playerData.name }}</p>
                </div>
                <div class="text-right items-center justify-center p-3">
                    <p class="font-bold text-2xl ml-5 mr-5 text-white"> Score: {{ playerData.score }} </p>
                </div>
            </div>
            <div @click="stateChange">
                <p class="font-bold text-2xl ml-5 mr-5 text-white hover:underline"> next </p>
            </div>
        </nav>
        <div class="w-full h-[calc(100vh-100px)] bg-indigo-100 p-2 ">
            <div class="w-full h-[calc(100vh-150px)] bg-indigo-100  flex justify-center items-center">
                <div class="w-full h-full grid grid-cols-1 gap-10">
                    <span class="text-5xl flex justify-center items-center"> {{ currentQuizState.question }}
                    </span>
                    <div class="w-full h-full p-2 grid grid-cols-2 gap-10" v-if="currentQuizState.type == 'Choices'">
                        <div v-for="(choice, index) in currentQuizState.choices" :key="index"
                            class="choice-button text-[50px] flex justify-center items-center"
                            :class="correctionAnswer(choice)">
                            {{ choice.value }}
                        </div>
                    </div>
                    <div class="w-full h-full p-5 grid grid-cols-2 gap-10 text-[50px]"
                        v-if="currentQuizState.type == 'True-False'">

                        <div v-for="(choice, index) in currentQuizState.choices" :key="index"
                            class="choice-button text-[50px] flex justify-center items-center"
                            :class="correctionAnswer(choice)">
                            {{ choice.value }}
                        </div>
                    </div>
                    <div class="max-h-[200px] p-5 grid grid-cols-1" v-if="currentQuizState.type == 'Short Answer'">
                        <span v-if="currentQuizState.correction.value !== currentQuizState.answer.value"
                            class="text-5xl flex justify-center items-center font-bold text-[#D22B2B]"> {{
                                currentQuizState.answer.value }}</span>
                        <span class="text-5xl flex justify-center items-center font-bold text-[#00FF7F]"> {{
                            currentQuizState.correction.value }} </span>
                    </div>
                </div>

            </div>
        </div>

    </template>
    <!-- summary state -->
    <template v-if="currentState() === 'summary'">
        <template v-if="isHost">
            <div class="w-full h-[100vh] bg-indigo-100 p-10 overflow-auto    ">
                <SummaryPlayer :players="players" :playerData="playerData" />
            </div>
        </template>
    </template>
</template>

<script>
import SummaryPlayer from '../../components/role-related/playerComponent/summary.vue'
import { getAuth } from 'firebase/auth'
import axios from 'axios'

export default {
    name: 'Room',
    data() {
        return {
            auth: getAuth(),
            isHost: true,
            Lastquestion: false,
            roomConfig: {
                time_limit: 99,
            },
            timerCount: 99,
            timerEnabled: false,
            buttonsDisabled: false,
            state: {
                currentState: { value: 'waiting' },
                states: [
                    { value: 'waiting' },   //standby in room before host press start
                    { value: 'answer' },     //state on can answer
                    { value: 'correction' },    //state when timeout and show the corrected answer
                    { value: 'scoreboard' },      //show rank on host screen
                    { value: 'summary' },      //summary #host 1st2nd3rd rank #player give their rank and first 3 rank
                ]
            },
            currentQuizState: {
                items: 0,
                types: ['Choices', 'True-False', 'Short Answer'], // Add your types here
                answer: { value: '' },
                type: '',
                question: '',
                choices: [],
                correction: { value: '' },
            },
            playerData: {},
            quizData: {
            },
            results: []

        }
    },
    created() {
        this.roompin = this.$route.params.roompin;
    },
    methods: {
        currentState() {
            return this.state.currentState.value
        },
        addResult() {
            this.results.push({
                answer: this.currentQuizState.answer.value,
                correct: (this.currentQuizState.answer.value == this.currentQuizState.correction.value),
            });
            console.log(this.results)
        },
        getItems() {
            return Array.isArray(this.quizData.questions) ? this.quizData.questions.length : 0
        },
        stateChange() {
            console.log(this.state.currentState.value + ' -> ')

            if (this.currentState() === 'waiting') { // Changed to strict equality operator '==='
                this.timerCount += 1; // Incrementing timerCount
                this.play();
                this.state.currentState.value = 'answer';
                this.currentQuizState.answer.value = '';
                this.currentQuizState.type = this.quizData.questions[this.currentQuizState.items].type;
                this.currentQuizState.question = this.quizData.questions[this.currentQuizState.items].question;
                this.currentQuizState.choices = this.quizData.questions[this.currentQuizState.items].choices;
                this.currentQuizState.correction = this.quizData.questions[this.currentQuizState.items].answer; // Changed 'this.currentQuizState.correction' to 'this.currentQuizState.correction.value'
            }
            if ((this.currentState() === 'answer') && (this.timerCount === 0)) { // Changed to strict equality operators '==='
                this.state.currentState.value = 'correction';
                if (this.currentQuizState.answer.value == this.currentQuizState.correction.value) this.playerData.score = this.playerData.score + 1
                this.addResult()
                console.log(this.currentQuizState);
            } else if (this.currentState() === 'correction') { // Changed to strict equality operator '==='
                console.log(this.currentQuizState);
                if ((this.getItems() - 1) === this.currentQuizState.items) { // Changed to strict equality operators '==='
                    console.log(this.results)
                    this.auth.currentUser.getIdToken().then(token => {
                        axios.put(import.meta.env.VITE_BACKEND_URI + '/api/records/' + this.$route.params.roompin, {
                            data: {
                                results: this.results
                            }
                        }, {
                            withCredentials: true,
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }).then((res) => {
                            if (res.data.success) {
                            } else {

                            }
                        })
                    })
                    this.state.currentState.value = 'summary';
                } else {
                    this.state.currentState.value = 'answer';
                    this.currentQuizState.items += 1; // Incrementing 'this.currentQuizState.items'
                    this.currentQuizState.answer.value = '';
                    this.currentQuizState.type = this.quizData.questions[this.currentQuizState.items].type;
                    this.currentQuizState.question = this.quizData.questions[this.currentQuizState.items].question;
                    this.currentQuizState.choices = this.quizData.questions[this.currentQuizState.items].choices;
                    this.currentQuizState.correction = this.quizData.questions[this.currentQuizState.items].answer; // Changed 'this.currentQuizState.correction' to 'this.currentQuizState.correction.value'
                    this.play();
                }
            }
        },

        Answer(choice) {
            if (choice == null) { this.timerCount = 1; return 0; }
            this.timerCount = 1
            this.currentQuizState.answer.value = choice.value
            console.log(this.currentQuizState.answer.value)
        },
        correctionAnswer(button) {
            if (this.currentQuizState.type == 'Choices') {
                if (button.value == this.currentQuizState.correction.value) {
                    return 'choice-button-correct'
                }
                if ((this.currentQuizState.answer.value !== this.currentQuizState.correction.value) && (button.value == this.currentQuizState.answer.value)) {
                    return 'choice-button-wrong'
                } else {
                    return 'choice-button'
                }
            } else if (this.currentQuizState.type == 'True-False') {
                if (button.value == this.currentQuizState.correction.value) {
                    return 'choice-button-correct'
                }
                if ((this.currentQuizState.answer.value !== this.currentQuizState.correction.value) && (button.value == this.currentQuizState.answer.value)) {
                    return 'choice-button-wrong'
                } else {
                    return 'choice-button'
                }
            } else if (this.currentQuizState.type == 'Short Answer') {
                if (this.currentQuizState.answer.value == this.currentQuizState.correction.value) {
                    return 'area-correct'
                } else {
                    return 'area-wrong'
                }
            }
        },
        play() {
            this.timerEnabled = true;
        },
        pause() {
            this.timerEnabled = false;
        },
    },
    mounted() {
        this.auth.currentUser.getIdToken().then((token) => {
            axios.get(import.meta.env.VITE_BACKEND_URI + '/api/quizzes/' + this.$route.params.roompin, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => {
                    if (!res.data.success) {
                        alert(res.data.message)
                    }
                    else {
                        this.quizData = res.data.quiz
                        // console.log(this.quizzes)
                        this.playerData = {
                            name: this.auth.currentUser.displayName,
                            score: 0,
                        }
                    }
                }).catch((err) => { console.log(err) })
        })
    },
    computed: {
        overtime() {
            return (this.timerCount > this.roomConfig.time_limit)
        }
    },
    watch: {
        timerEnabled(value) {
            if (value) {
                setTimeout(() => {
                }, 1000);
            }
        },
        timerCount: {
            handler(value) {
                if (value > 0 && this.timerEnabled) {
                    setTimeout(() => {
                        this.timerCount--;
                        console.log(this.timerCount)
                        if (this.timerCount == 0) {
                            this.stateChange()
                            this.timerEnabled = false;
                            this.timerCount = this.roomConfig.time_limit
                        }
                    }, 1000);
                }
            },
            immediate: true // This ensures the watcher is triggered upon creation
        }
    }
}
</script>

<style scoped>
.choice-button {
    background-color: #4a90e2;
    color: #ffffff;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
}

.choice-button.disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.choice-button-correct {
    background-color: #00FF7F;
    color: #ffffff;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
}

.choice-button-wrong {
    background-color: #D22B2B;
    color: #ffffff;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
}

.area-correct {
    border-color: #00FF7F;
    pointer-events: none;
}

.area-wrong {
    border-color: #D22B2B;
    pointer-events: none;
}
</style>