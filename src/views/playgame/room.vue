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
            <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{ player.max }}</span>
            <button type="button"
                class=" font-bold h-full p-3 m-5 rounded-[10px] bg-indigo-700 text-indigo-300 hover:bg-indigo-600"
                v-if="isHost" @click="startQuiz()">
                START
            </button>
        </nav>
        <div class="w-full h-[calc(100vh-70px)] bg-indigo-100 p-10 overflow-auto    ">
            <PlayerList :players="players" />
        </div>
    </template>
    <template v-if="currentState() === 'answer'">
        <template v-if="!isHost">
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
        <template v-if="isHost">
            <nav class="bg-indigo-900 h-[70px] flex text-center items-center justify-center p-3">
                <span class="font-bold text-2xl ml-5 mr-5 text-white">PIN : {{ roompin }} </span>
                <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{ player.max
                    }}</span>
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
                <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{ player.max
                    }}</span>
                <button type="button"
                    class=" font-bold h-full p-3 m-5 rounded-[10px] bg-indigo-700 text-indigo-300 hover:bg-indigo-600"
                    v-if="isHost" @click="startQuiz()">
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
                <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{ player.max
                    }}</span>
                <button type="button"
                    class=" font-bold h-full p-3 m-5 rounded-[10px] bg-indigo-700 text-indigo-300 hover:bg-indigo-600"
                    v-if="isHost" @click="startQuiz()">
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
                <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{ player.max
                    }}</span>
                <button type="button"
                    class=" font-bold h-full p-3 m-5 rounded-[10px] bg-indigo-700 text-indigo-300 hover:bg-indigo-600"
                    v-if="isHost" @click="startQuiz()">
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
                <SummaryPlayer :players="players" :playerData="playerData"/>
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
            player: {
                max: 30,
            },
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
                    { value: 'answer' },     //state on can answer but don't answer yet
                    { value: 'answered' },      //state on answered and wait before time out
                    { value: 'correction' },    //state when timeout and show the corrected answer
                    { value: 'scoreboard' },      //show rank on host screen
                    { value: 'summary' },      //summary #host 1st2nd3rd rank #player give their rank and first 3 rank
                ]
            },
            currentQuizState: {
                items: 1,
                timeout: false,
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
        startQuiz() {
            this.state.currentState = { value: 'summary' }
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
        }
    },

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