<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <div class="h-full mt-0 bg-gray-50 ">
        <div class="min-h-[calc(100vh - 252px)] mt-[50px] p-[30px] flex items-center justify-center">
            <template v-for="(question, index) in questions" :key="index">
                <div class="container min-h-[60vh]  border-dashed border border-gray-400 rounded-[25px] flex flex-col items-center justify-center"
                    v-if="isQuestionSelect(index)">
                    <div class="text-box w-full h-[100px] pl-[30px] pr-[30px] relative">
                        <textarea
                            class="textboxinput  w-full h-full p-[10px] border-[2px] border-dashed rounded-[10px] resize-none border-box font-[16px] text-center text-3xl items-center"
                            v-model="question.question"></textarea>
                    </div><br><br>

                    <div v-if="questiontype(question) === 'Choices'" class="flex m-5">
                        <div v-for="(choice, choiceIndex) in question.choices" :key="choiceIndex" class="ml-2 mr-2">
                            <textarea
                                class="textboxinput w-full h-full p-[10px] border-[2px] border-dashed rounded-[10px] resize-none border-box font-[16px] text-center text-3xl items-center"
                                v-model="choice.value"></textarea>
                            <input type="radio" :id="'choice-' + choiceIndex" :name="'question-' + index"
                                v-model="question.answer.value" :value="choice.value">
                        </div>
                    </div>

                    <div v-if="questiontype(question) == 'True-False'">
                        <input type="radio" v-model="question.answer.value" value="True"> True
                        <input type="radio" v-model="question.answer.value" value="False"> False
                    </div>

                    <div class="text-box w-full h-[100px] pl-[30px] pr-[30px] relative"
                        v-if="questiontype(question) == 'Short Answer'">
                        <textarea
                            class="textboxinput  w-full h-full p-[10px] border-[2px] border-dashed rounded-[10px] resize-none border-box font-[16px] text-center text-3xl items-center"
                            v-model="question.answer.value" placeholder="Enter answer"></textarea>
                    </div>

                </div>
            </template>
            <div class="container min-h-[60vh]  border-dashed border border-gray-400 rounded-[25px] flex flex-col items-center justify-center"
                    v-if="isQuestionEmpty()">
                    <div class="text-box w-full h-[100px] pl-[30px] pr-[30px] relative">
                        <textarea
                            class="textboxinput  w-full h-full p-[10px] border-[2px] border-dashed rounded-[10px] resize-none border-box font-[16px] text-center text-3xl items-center"></textarea>
                    </div><br><br>
                </div>
        </div>
        <div
            class="w-full min-h-[120px] overflow-x-auto flex bg-white border border-gray-400 border-t-1 border-b-1 p-5">
            <template v-for="(question, index) in questions" :key="index">
                <button
                    class="selectq flex items-center flex-shrink-0 overflow-y-auto bg-white border-2 border-indigo-950 rounded-[10px]"
                    @click="selectQuestion(index, question.type)">
                    <button class="relative text-white m-2 flex items-end" @click="DeleteQuiz(index)"><svg
                            class="w-5 h-5 text-indigo-950 hover:text-red-500 transition-all ease-in" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                    </button>
                    <div
                        class="min-h-[70px] w-[110px]  flex text-xs text-indigo-950 font-medium items-center justify-center ">
                        {{ (index + 1) + ' - ' + question.type }} <br>
                        {{ question.question }}
                    </div>
                </button>

                <button class="selectq flex-shrink-0 overflow-y-auto ml-7 rounded-[10px]" v-if="isLastIndex(index)"
                    @click="AddQuiz(index + 1)">
                    <div
                        class=" min-h-[80px] w-[150px] flex items-center justify-center text-indigo-950 text-4xl font-bold bg-white border-[3px] border-indigo-950 rounded-[10px] border-dashed ">
                        +
                    </div>
                </button>
                <button class="flex-shrink-0 overflow-y-auto" v-else @click="AddQuiz(index + 1)">
                    <div
                        class="addbtn min-h-[80px] w-[30px] flex items-center border-dashed justify-center text-white text-4xl font-bold bg-white">
                        +
                    </div>
                </button>
            </template>
            <button class="selectq flex-shrink-0 overflow-y-auto rounded-[10px]" v-if="isQuestionEmpty()" 
                    @click="AddQuiz(0)">
                    <div
                        class=" min-h-[80px] w-[150px] flex items-center justify-center text-indigo-950 text-4xl font-bold bg-white border-[3px] border-indigo-950 rounded-[10px] border-dashed ">
                        +
                    </div>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuestionList',
    props: {
        questions: {}
    },
    data() {
        return {
            focusQuestion: 1,
        }
    },
    methods: {
        isLastIndex(index) {
            return index === this.questions.length - 1;
        },
        isQuestionEmpty(){
            return 0 === this.questions.length
        },
        isQuestionSelect(index) {
            return index === this.focusQuestion - 1
        },
        selectQuestion(index, type) {
            this.focusQuestion = index + 1
            const data = type;
            this.$emit('Type-focus', data, index);
        },
        questiontype(question) {
            return question.type
        },
        AddQuiz(index) {
            const newQuestion = {
                type: 'Choices',
                question: '',
                choices: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
                answer: { value: "" },
            };
            this.questions.splice(index, 0, newQuestion);
        },
        DeleteQuiz(index) {
            this.questions.splice(index, 1);
        }

    },
}
</script>

<style scoped>
.selectq {
    transition: box-shadow 0.3s ease;
}

.selectq:hover {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}

.addbtn {
    border-radius: 10px;
    border-width: 3px;
    border-color: white;
    transition: width 0.3s ease, border-color 0.3s ease, color 0.3s ease, margin-left 0.3s ease, margin-right 0.3s ease;
    transition-delay: 0s;
}

.addbtn:hover {
    width: 150px;
    margin-left: 10px;
    margin-right: 10px;
    border-color: rgb(30 27 75);
    color: rgb(30 27 75);
    transition-delay: 0.2s;
}

.textboxinput {
    vertical-align: middle;
    text-align: center;
}
</style>