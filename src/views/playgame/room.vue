<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
onMounted(() => {
    initFlowbite();
})

</script>

<template>
    <template v-if="currentState() === 'waiting'">
        <nav class="bg-indigo-900 h-[70px] flex text-center items-center justify-center p-3">
            <span class="font-bold text-2xl ml-5 mr-5 text-white">PIN : {{ roompin }} </span>
            <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{ roomConfig.max_player
                }}</span>
            <button type="button"
                class=" font-bold h-full p-3 m-5 rounded-[10px] bg-indigo-700 text-indigo-300 hover:bg-indigo-600"
                v-if="isHost" @click="stateChange()">
                START
            </button>
        </nav>
        <div class="w-full h-[calc(100vh-70px)] bg-indigo-100 p-10 overflow-auto">
            <PlayerList :players="players" />
        </div>
    </template>
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
        <template v-if="!isHost && !overtime">
            <div class="w-full h-[calc(100vh-100px)] bg-indigo-100 p-10 overflow-auto flex justify-center items-center">
                <div class="w-full h-full p-5 grid grid-cols-2 gap-10" v-if="currentQuizState.type == 'Choices'">
                    <button v-for="(button, index) in buttonData.buttons.choice" :key="index"
                        class="choice-button text-[50px]"
                        :class="{ 'disabled': buttonsDisabled && selectedButton !== button }"
                        @click="handleButtonClick(button)">
                        {{ button }}
                    </button>
                </div>
                <div class="w-full h-full p-5 grid grid-cols-2 gap-10" v-if="currentQuizState.type == 'True-False'">
                    <button v-for="(button, index) in buttonData.buttons.truefalse" :key="index"
                        class="choice-button text-[50px]"
                        :class="{ 'disabled': buttonsDisabled && selectedButton !== button }"
                        @click="handleButtonClick(button)">
                        {{ button }}
                    </button>
                </div>
                <div class="max-h-[200px] p-5 grid grid-cols-1" v-if="currentQuizState.type == 'Short Answer'">
                    <textarea
                        class="textboxinput max-h-[300px] p-[10px] border-[2px] border-dashed rounded-[10px] resize-none border-box font-[16px] text-center text-3xl"
                        v-model="currentQuizState.answer.value" placeholder="Enter answer"></textarea>
                    <div>
                        <button class="choice-button rounded-[10px] mt-6 w-[300px] h-[50px]"
                            :class="{ 'disabled': buttonsDisabled }" @click="handleSubmit()">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="fixed bottom-0 left-0 z-50 w-full h-[100px] bg-indigo-900 flex text-center items-center justify-center p-3">
                <div class="w-full ml-5 mr-5 p-5 grid grid-cols-2 gap-4">
                    <div
                        class="min-w-[100px] max-w-[500px] bg-white p-2 rounded-lg shadow-md text-center items-center justify-center flex">
                        <p class="text-lg font-semibold">{{ playerData.name }}</p>
                    </div>
                    <div class="text-right items-center justify-center p-3">
                        <p class="font-bold text-2xl ml-5 mr-5 text-white"> Score: {{ playerData.score }} </p>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="isHost && !overtime">
            <nav class="bg-indigo-900 h-[70px] flex text-center items-center justify-center p-3">
                <span class="font-bold text-2xl ml-5 mr-5 text-white">PIN : {{ roompin }} </span>
                <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{
                    roomConfig.max_player
                    }} {{ timerCount }}</span>
            </nav>
            <div class="w-full h-[calc(100vh-70px)] bg-indigo-100 p-10 ">
                <div class="w-full h-[calc(100vh-150px)] bg-indigo-100  flex justify-center items-center">
                    <div class="w-full h-full grid grid-cols-1 gap-10" v-if="currentQuizState.type == 'Choices'">
                        <span class="text-5xl flex justify-center items-center"> {{ currentQuizState.question }} </span>
                        <div class="w-full h-full p-2 grid grid-cols-2 gap-10"
                            v-if="currentQuizState.type == 'Choices'">
                            <div v-for="(choice, index) in currentQuizState.choices" :key="index"
                                class="choice-button text-3xl flex justify-center items-center">
                                {{ choice.value }}
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-full p-5 grid grid-cols-2 gap-10" v-if="currentQuizState.type == 'True-False'">
                        <span class="text-5xl flex justify-center items-center"> {{ currentQuizState.question }} </span>
                        <div class="w-full h-full p-5 grid grid-cols-2 gap-10"
                            v-if="currentQuizState.type == 'Choices'">
                            <div v-for="(choice, index) in currentQuizState.choices" :key="index"
                                class="choice-button text-3xl flex justify-center items-center">
                                {{ choice.value }}
                            </div>
                        </div>
                    </div>
                    <div class="max-h-[200px] p-5 grid grid-cols-1" v-if="currentQuizState.type == 'Short Answer'">
                        <span class="text-5xl flex justify-center items-center"> {{ currentQuizState.question }} </span>
                    </div>
                </div>
            </div>
        </template>
    </template>
    <template v-if="currentState() === 'correction'">
        <template v-if="!isHost">
            <div class="w-full h-[calc(100vh-100px)] bg-indigo-100 p-10 overflow-auto flex justify-center items-center">
                <div class="w-full h-full p-5 grid grid-cols-2 gap-10 text-[50px]"
                    v-if="currentQuizState.type == 'Choices'">
                    <button v-for="(button, index) in buttonData.buttons.choice" :key="index"
                        :class="correctionAnswer(button)">
                        {{ button }}
                    </button>
                </div>
                <div class="w-full h-full p-5 grid grid-cols-2 gap-10 text-[50px]"
                    v-if="currentQuizState.type == 'True-False'">
                    <button v-for="(button, index) in buttonData.buttons.truefalse" :key="index"
                        :class="correctionAnswer(button)">
                        {{ button }}
                    </button>
                </div>
                <div class="max-h-[200px] p-5 grid grid-cols-1" v-if="currentQuizState.type == 'Short Answer'">
                    <textarea
                        class="textboxinput max-h-[300px] p-[10px] border-[2px] border-dashed rounded-[10px] resize-none border-box font-[16px] text-center text-3xl"
                        v-model="currentQuizState.answer.value" placeholder="Enter answer"
                        :class="correctionAnswer(button)"></textarea>
                    <div>
                        <button class="choice-button rounded-[10px] mt-6 w-[300px] h-[50px]">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="fixed bottom-0 left-0 z-50 w-full h-[100px] bg-indigo-900 flex text-center items-center justify-center p-3">
                <div class="w-full ml-5 mr-5 p-5 grid grid-cols-2 gap-4">
                    <div
                        class="min-w-[100px] max-w-[500px] bg-white p-2 rounded-lg shadow-md text-center items-center justify-center flex">
                        <p class="text-lg font-semibold">{{ playerData.name }}</p>
                    </div>
                    <div class="text-right items-center justify-center p-3">
                        <p class="font-bold text-2xl ml-5 mr-5 text-white"> Score: {{ playerData.score }} </p>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="isHost">
            <nav class="bg-indigo-900 h-[70px] flex text-center items-center justify-center p-3">
                <span class="font-bold text-2xl ml-5 mr-5 text-white">PIN : {{ roompin }} </span>
                <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{
                    roomConfig.max_player
                    }}</span>
                <button type="button"
                    class=" font-bold h-full p-3 m-5 rounded-[10px] bg-indigo-700 text-indigo-300 hover:bg-indigo-600"
                    v-if="isHost" @click="stateChange()">
                    NEXT
                </button>
            </nav>
            <div class="w-full h-[calc(100vh-70px)] bg-indigo-100 p-10 ">
                <div class="w-full h-[calc(100vh-150px)] bg-indigo-100  flex justify-center items-center">
                    <div class="w-full h-full grid grid-cols-1 gap-10" v-if="currentQuizState.type == 'Choices'">
                        <span class="text-5xl flex justify-center items-center"> {{ currentQuizState.question }} </span>
                        <div class="w-full h-full p-2 grid grid-cols-2 gap-10"
                            v-if="currentQuizState.type == 'Choices'">
                            <div v-for="(choice, index) in currentQuizState.choices" :key="index"
                                class="choice-button text-3xl flex justify-center items-center"
                                :class="correctionAnswer(choice)">
                                {{ choice.value }}
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-full p-5 grid grid-cols-2 gap-10" v-if="currentQuizState.type == 'True-False'">
                        <span class="text-5xl flex justify-center items-center"> {{ currentQuizState.question }} </span>
                        <div class="w-full h-full p-5 grid grid-cols-2 gap-10"
                            v-if="currentQuizState.type == 'Choices'">
                            <div v-for="(choice, index) in currentQuizState.choices" :key="index"
                                class="choice-button text-3xl flex justify-center items-center"
                                :class="correctionAnswer(choice)">
                                {{ choice.value }}
                            </div>
                        </div>
                    </div>
                    <div class="max-h-[200px] p-5 grid grid-cols-1" v-if="currentQuizState.type == 'Short Answer'">
                        <span class="text-5xl flex justify-center items-center mb-6"> {{ currentQuizState.question }}
                        </span>
                        <span class="text-5xl flex justify-center items-center font-bold text-[#00FF7F]"> {{
                            currentQuizState.correction.value }} </span>
                    </div>
                </div>
            </div>
        </template>
    </template>
    <template v-if="currentState() === 'scoreboard'">
        <template v-if="isHost">
            <nav class="bg-indigo-900 h-[70px] flex text-center items-center justify-center p-3">
                <span class="font-bold text-2xl ml-5 mr-5 text-white">PIN : {{ roompin }} </span>
                <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{
                    roomConfig.max_player
                    }}</span>
                <button type="button"
                    class=" font-bold h-full p-3 m-5 rounded-[10px] bg-indigo-700 text-indigo-300 hover:bg-indigo-600"
                    v-if="isHost" @click="stateChange()">
                    NEXT
                </button>
            </nav>
            <div class="w-full h-[calc(100vh-70px)] bg-indigo-100 p-10 overflow-auto    ">
                <Ranking :players="players" />
            </div>
        </template>
        <template v-if="!isHost">
            <div class="w-full h-[calc(100vh-100px)] bg-indigo-100 p-10 overflow-auto flex justify-center items-center">
                <div class="w-full h-full p-5 grid grid-cols-2 gap-10 text-[50px]"
                    v-if="currentQuizState.type == 'Choices'">
                    <button v-for="(button, index) in buttonData.buttons.choice" :key="index"
                        :class="correctionAnswer(button)">
                        {{ button }}
                    </button>
                </div>
                <div class="w-full h-full p-5 grid grid-cols-2 gap-10 text-[50px]"
                    v-if="currentQuizState.type == 'True-False'">
                    <button v-for="(button, index) in buttonData.buttons.truefalse" :key="index"
                        :class="correctionAnswer(button)">
                        {{ button }}
                    </button>
                </div>
                <div class="max-h-[200px] p-5 grid grid-cols-1" v-if="currentQuizState.type == 'Short Answer'">
                    <textarea
                        class="textboxinput max-h-[300px] p-[10px] border-[2px] border-dashed rounded-[10px] resize-none border-box font-[16px] text-center text-3xl"
                        v-model="currentQuizState.answer.value" placeholder="Enter answer"
                        :class="correctionAnswer(button)"></textarea>
                    <div>
                        <button class="choice-button rounded-[10px] mt-6 w-[300px] h-[50px]">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="fixed bottom-0 left-0 z-50 w-full h-[100px] bg-indigo-900 flex text-center items-center justify-center p-3">
                <div class="w-full ml-5 mr-5 p-5 grid grid-cols-2 gap-4">
                    <div
                        class="min-w-[100px] max-w-[500px] bg-white p-2 rounded-lg shadow-md text-center items-center justify-center flex">
                        <p class="text-lg font-semibold">{{ playerData.name }}</p>
                    </div>
                    <div class="text-right items-center justify-center p-3">
                        <p class="font-bold text-2xl ml-5 mr-5 text-white"> Score: {{ playerData.score }} </p>
                    </div>
                </div>
            </div>
        </template>
    </template>
    <template v-if="currentState() === 'summary'">
        <template v-if="!isHost">
            <nav class="bg-indigo-900 h-[70px] flex text-center items-center justify-center p-3">
                <span class="font-bold text-2xl ml-5 mr-5 text-white">PIN : {{ roompin }} </span>
                <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{
                    roomConfig.max_player}}</span>
                <button type="button"
                    class=" font-bold h-full p-3 m-5 rounded-[10px] bg-indigo-700 text-indigo-300 hover:bg-indigo-600"
                    v-if="isHost" @click="stateChange()">
                    NEXT
                </button>
            </nav>
            <div class="w-full h-[calc(100vh-70px)] bg-indigo-100 p-10 overflow-auto    ">
                <div class="m-10">
                    <span class="font-bold text-3xl"> Congraturations </span>
                </div>
                <div class="">
                    <SummaryHost :players="players" />
                </div>
            </div>
        </template>
        <template v-if="isHost">
            <div class="w-full h-[100vh] bg-indigo-100 p-10 overflow-auto    ">
                <SummaryPlayer :players="players" :playerData="playerData" />
            </div>
        </template>
    </template>
</template>

<script>
import PlayerList from '../../components/playComponent/PlayerList.vue';
import Ranking from '../../components/role-related/hostComponent/ranking.vue'
import SummaryHost from '../../components/role-related/hostComponent/summary.vue'
import SummaryPlayer from '../../components/role-related/playerComponent/summary.vue'

export default {
    name: 'Room',
    data() {
        return {
            roompin: '',
            isHost: true,
            Lastquestion: false,
            roomConfig: {
                time_limit: 10,
                max_player: 30,
            },
            timerCount: 10,
            timerEnabled: false,
            buttonsDisabled: false,
            players: [
                {
                    name: 'golf',
                    score: 0,
                },
                {
                    name: 'fran',
                    score: 0,
                },
                {
                    name: 'ek',
                    score: 0,
                },
                {
                    name: 'pao',
                    score: 0,
                },
                {
                    name: 'ming',
                    score: 3,
                },
                {
                    name: 'bank',
                    score: 2,
                },
                {
                    name: 'pun',
                    score: 99,
                },
            ],
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
                items: 1,
                types: ['Choices', 'True-False', 'Short Answer'], // Add your types here
                answer: { value: 'True' },
                //socket call and input this data
                type: 'Choices',
                question: '1+1=2',
                choices: [
                    { value: "3" }, { value: "2" }, { value: "5" }, { value: "WTF" }
                    //{ value: "True" }, { value: "False" }
                ],
                correction: { value: 'WTF' },//{ value: "False" }
            },
            playerData: {
                name: 'golf',
                score: 0,
            },
            buttonData: {
                buttons: { choice: ['●', '■', '▲', '★'], truefalse: ['True', 'False'], shortans: ['submit'] },
                buttonsDisabled: false,
                selectedButton: null
            }
        }
    },
    created() {
        this.roompin = this.$route.params.roompin;

    },
    methods: {
        currentPlayer() {
            return this.players.length
        },
        currentState() {
            return this.state.currentState.value
        },
        getNextQuestion(type) {
            this.currentQuizState.currentType = type
        },
        stateChange() {
            console.log(this.state.currentState.value + ' -> ')

            if (this.currentState() == 'waiting') {
                this.timerCount = this.timerCount + 3
                this.play()
                this.state.currentState.value = 'answer'
                //socket signals
            }
            if ((this.currentState() == 'answer') && (this.timerCount == 0)) {
                //socket signal
                this.state.currentState.value = 'correction'
            }else if (this.currentState() == 'correction') {
                this.state.currentState.value = 'scoreboard'
            }else if (this.currentState() == 'scoreboard'){
                if(Lastquestion == true){
                    this.state.currentState.value = 'summary'
                }else{
                    //socket signal
                    this.state.currentState.value = 'answer'
                }
            }

            console.log(' -> ' + this.state.currentState.value )
        },
        handleButtonClick(selectedButton) {
            if (!this.buttonsDisabled) {
                this.selectedButton = selectedButton;
                this.buttonsDisabled = true;
                if (this.currentQuizState.type == 'Choices') {
                    this.currentQuizState.answer.value = this.currentQuizState.choices[parseInt(this.buttonData.buttons.choice.indexOf(selectedButton))]
                    console.log(this.currentQuizState.answer.value)
                }
                else {
                    this.currentQuizState.answer.value = selectedButton
                    console.log(this.currentQuizState.answer.value)
                }
            }
        },
        handleSubmit() {
            this.buttonsDisabled = true;
            console.log(this.currentQuizState.answer.value)
        },
        correctionAnswer(button) {
            if (this.currentQuizState.type == 'Choices') {
                if (button.value == this.currentQuizState.correction.value || this.currentQuizState.choices.findIndex(choice => choice.value === this.currentQuizState.correction.value) == parseInt(this.buttonData.buttons.choice.indexOf(button))) {
                    return 'choice-button-correct'
                }
                if ((this.currentQuizState.answer.value !== this.currentQuizState.correction.value) && (this.currentQuizState.choices.findIndex(choice => choice.value === this.currentQuizState.answer.value) == parseInt(this.buttonData.buttons.choice.indexOf(button)))) {
                    return 'choice-button-wrong'
                } else {
                    return 'choice-button'
                }
            } else if (this.currentQuizState.type == 'True-False') {
                if (button.value == this.currentQuizState.correction.value || this.currentQuizState.choices.findIndex(choice => choice.value === this.currentQuizState.correction.value) == parseInt(this.buttonData.buttons.truefalse.indexOf(button))) {
                    return 'choice-button-correct'
                }
                if ((this.currentQuizState.answer.value !== this.currentQuizState.correction.value) && (this.currentQuizState.choices.findIndex(choice => choice.value === this.currentQuizState.answer.value) == parseInt(this.buttonData.buttons.truefalse.indexOf(button)))) {
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