import Notiflix from 'notiflix';


const formData = document.querySelector('.form');
formData.elements.delay.setAttribute("step", "100");
formData.elements.delay.setAttribute("min", "0");
formData.elements.step.setAttribute("step", "100");
formData.elements.step.setAttribute("min", "0");
formData.elements.amount.setAttribute("min", "0");
let delaySum;

formData.addEventListener('submit', onFormSubmit);

function onFormSubmit(el) {
  el.preventDefault();
  let firstDelay = Number(el.target.elements.delay.value);
  let delayStep = Number(el.target.elements.step.value);
  let amountInfo = Number(el.target.elements.amount.value);


  for (let i = 0; i <= amountInfo; i += 1) {
    if (i === 0) {
      delaySum = firstDelay;
    } else {
      delaySum = firstDelay += delayStep;
    }


    createPromise((++i), delaySum).then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });


  };

  el.currentTarget.reset();

};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay
        });
      } else {
        reject({
          position,
          delay
        });
      }
    })
  }, delaySum);
};


