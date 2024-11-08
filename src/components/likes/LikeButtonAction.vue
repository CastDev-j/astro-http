<template>


    <div v-if="isLoading" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>

    <button v-else-if="likeCount === 0" @click="likePost">
        Like Counter
    </button>

    <button v-else @click="likePost">
        Likes <span class="like-count">{{ likeCount }}</span>
    </button>

    {{ likeClicks }}


</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti';
import debounce from 'lodash/debounce';
import { actions } from 'astro:actions';


interface Props {
    postId: string;
}

const props = defineProps<Props>();


const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(likeCount, debounce(async () => {


    await actions.updatePostLikes({ postId: props.postId, likes: likeClicks.value });

    likeClicks.value = 0;

}, 500));


const likePost = () => {
    likeCount.value++;
    likeClicks.value++;
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
    })
}


const getCurrentLikes = async () => {
    // const resp = await fetch(`/api/posts/likes/${props.postId}`);
    // if (!resp.ok) return;
    // const data = await resp.json();
    // likeCount.value = data[0].likes;

    const { data, error } = await actions.getPostLikes(props.postId);
    if (error) return;

    const { likes } = data;



    likeCount.value = likes;
    isLoading.value = false;

}

getCurrentLikes();

</script>



<style scoped>
button {
    background-color: #f8f9fa;
    border: 1px solid #f8f9fa;
    color: #212529;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    cursor: pointer;
    height: 40px;
}

button:hover {
    background-color: #e9ecef;
    border-color: #e9ecef;
}

button:active {
    background-color: #dee2e6;
    border-color: #dee2e6;
}

button:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

button:disabled {
    background-color: #f8f9fa;
    border-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
}

button:disabled:hover {
    background-color: #f8f9fa;
    border-color: #f8f9fa;
    color: #6c757d;
}

.like-count {
    font-weight: bold;
    color: #000204;
    margin-left: 5px;
}
</style>