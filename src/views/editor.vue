<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <div>
        <aside id="default-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
            aria-label="Sidebar">
            <div class="h-full text-white border-gray-500">
                <div class="h-[70px] bg-indigo-950 justify-center items-left py-6">
                    <p class="font-bold text-5xl">Kahoot!</p>
                    <p class="font-bold text-xl">Clone</p>
                </div>
                <div class="w-full h-[calc(100vh-70px)] bg-indigo-950">
                    <div class="justify-between items-center w-full h-full space-y-[10px]">
                        <ul class="space-y-2 font-medium flex flex-col justify justify-between">
                            <li><br></li>
                            <li><br></li>
                            <div class="flex flex-col justify-between px-5 hover:text-indigo-950">
                                <button
                                    class="hover:text-indigo-950 flex items-center justify-center sidebar-button text-white border border-white hover:bg-gray-900 focus:outline-none font-bold rounded-lg text-2xl w-full py-4 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-indigo-950 dark:hover:bg-white"
                                    @click="toggleDropdown">
                                    <svg class="w-[24px] h-[24px] hover:text-indigo-950" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                    {{ typeDropdown.selectedType }}
                                </button>
                                <div v-if="typeDropdown.isOpen"
                                    class="relative top-0 mt-1 w-50 bg-white shadow-lg rounded-md z-10">
                                    <ul class="py-1">
                                        <li v-for="(type, index) in typeDropdown.types" :key="index">
                                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                @click="selectType(type)">
                                                {{ type }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <li>
                                    <router-link to="/library">
                                        <button type="button"
                                            class=" hover:text-indigo-950  mt-7 flex items-center justify-center sidebar-button text-white border border-white hover:bg-gray-900 focus:outline-none font-bold rounded-lg text-2xl w-full py-4 text-center  mb-2 dark:border-white dark:text-white dark:hover:text-indigo-950 dark:hover:bg-white"
                                            @click="updateQuiz">
                                            Save
                                        </button>
                                    </router-link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    </div>

    <div class="sm:ml-64 bg-gray-400 border-gray-500 border-b-2">
        <nav
            class="flex fixed w-full z-10 top-0 start-0 h-screen-[70px] bg-gray-100 items-center shadow-sm px-[10px] py-[5px]  border-b ">
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar" type="button"
                class="items-center p-2 m-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-indigo-950 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                    </path>
                </svg>
            </button>

            <!-- Main Section -->
            <div class="w-[calc(100%-30px)] flex ">
                <div class="w-[calc(100%-200px)]"></div>
                <!-- User login -->
                <div class="w-[200px]">
                    <div class="flex items-center justify-end space-x-4 text-right">
                        <div class="font-semibold text-gray-900 text-left">
                            <div>{{ auth.currentUser.displayName }}</div>
                            <a class="text-sm text-gray-500 dark:text-gray-400 underline cursor-pointer hover:text-blue-600"
                                @click="logout">Sign Out</a>
                        </div>
                        <img class="w-10 h-10 rounded-full" src="../assets/vue.svg" alt="">
                    </div>
                    <!-- Drop down -->
                    <div v-show="showDropDown"
                        class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1 text-left" role="none">
                            <form method="POST" action="" @submit.prevent="logout">
                                <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                                    role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    </div>
    <div class="sm:ml-64 bg-gray-400 border-gray-500">
        <QuestionList :questions="quizData.questions" @Type-focus="handleData" />
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import axios from 'axios'

import QuestionList from '../components/editComponent/QuestionList.vue'
import { RouterLink } from 'vue-router'

export default {
    data() {
        return {
            auth: getAuth(),
            focus: 1,
            showDropDown: false,
            typeDropdown: {
                isOpen: false,
                selectedType: 'Choices',
                types: ['Choices', 'True-False', 'Short Answer'] // Add your types here
            },
            quizData: {
                quiz_name: '',
                owner_id: '',
                questions: [
                    {
                        type: 'Choices',
                        question: '1+1=2',
                        choices: [
                            { value: "3" }, { value: "2" }, { value: "5" }, { value: "WTF" }
                        ],
                        answer: { value: 'WTF' },
                    },
                    {
                        type: 'True-False',
                        question: '1+1=2 จริงไหม',
                        choices: [
                            { value: "True" }, { value: "False" }
                        ],
                        answer: { value: 'True' },
                    },
                    {
                        type: 'Short Answer',
                        question: '1+1=?',
                        choices: [
                        ],
                        answer: { value: '2' },
                    }
                ],
                time_limit: 30
            }
        }
    },
    methods: {
        toggleDrop() {
            this.showDropDown = !this.showDropDown
        },
        logout() {
            signOut(this.auth)
                .then(() => {
                    this.$router.replace('/login')
                })
                .catch((error) => {
                    alert(error.message)
                })
        },
        toggleDropdown() {
            this.typeDropdown.isOpen = !this.typeDropdown.isOpen;
        },
        selectType(type) {
            this.typeDropdown.selectedType = type;
            this.typeDropdown.isOpen = false;
            this.quizData.questions[this.focus].type = type

            switch (type) {
                case 'Choices':
                    this.quizData.questions[this.focus].choices = [
                        { value: "" },
                        { value: "" },
                        { value: "" },
                        { value: "" }
                    ];
                    break;
                case 'True-False':
                    this.quizData.questions[this.focus].choices = [
                        { value: "True" },
                        { value: "False" }
                    ];
                    break;
                case 'Short Answer':
                    this.quizData.questions[this.focus].choices = [];
                    break;
                default:
                    break;
            }

            this.$emit('type-selected', type);
        },
        handleData(data, index) {
            this.typeDropdown.selectedType = data;
            this.focus = index
        },
        updateQuiz() {
            console.log(this.quizData)
            this.auth.currentUser.getIdToken().then((token) => {
                axios.put(import.meta.env.VITE_BACKEND_URI + '/api/quizzes/' + this.$route.params.quiz_id, {
                    data: { quiz: this.quizData }
                }, {
                    withCblueentials: true,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            })

        },
        confirmUnload(event) {
            // Cancel the event
            event.preventDefault();
            // Chrome requires returnValue to be set
            event.returnValue = '';
            // Ask for confirmation
            const confirmationMessage = 'Are you sure you want to leave this site?';
            event.returnValue = confirmationMessage;
            return confirmationMessage;
        }
    },
    mounted() {
        console.log(this.auth)
        onAuthStateChanged(this.auth, (user) => {
            this.isLoggedIn = !!user;
        });
        window.addEventListener('beforeunload', this.confirmUnload);

        this.auth.currentUser.getIdToken().then((token) => {
            axios.get(import.meta.env.VITE_BACKEND_URI + '/api/quizzes/' + this.$route.params.quiz_id, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res, err) => {
                    if (err) throw new Error(err);

                    if (res.data.success) {
                        console.log(res.data.quiz);
                        this.quizData = res.data.quiz
                    }
                    else {
                        console.log(res.data.message);
                        alert(res.data.message)

                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert('Cannot access this quiz!')
                    this.$router.replace('/dashboard')
                })
        })


    },
    components: {
        QuestionList
    }
}
</script>

<style scoped>
.sidebar-item {
    transition: background-color 0.3s ease;
}

.sidebar-item:hover {
    background-color: #4a5568;
}

.sidebar-item {
    transition: background-color 0.3s ease;
}

.sidebar-button {
    transition: background-color 0.3s ease;
}
</style>