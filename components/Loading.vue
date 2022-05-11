<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {};
</script>

<style >
.loading {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
}
@keyframes circle-loading {
  to {
    transform: rotateZ(360deg);
  }
}

.loading span {
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #333;
  animation: circle-loading 1200ms ease infinite;
}
</style>
