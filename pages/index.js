import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [properties, setProperties] = useState({});

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const classes = target.classList;
    const ValueName = classes[0];
    let NewProperties = properties;
    NewProperties[ValueName] = value;
    NewProperties[`${ValueName}Error`] = '';
    setProperties({ ...NewProperties });
  };

  const validate = () => {
    const EmailRegex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
      PhoneNumberRegex =
        /\(?[+]?\d{1}?(\d{3})\)?([ .-]?)(\d{3})\2(\d{4})/;

    let NewProperties = properties;

    if (!properties.name) {
      NewProperties.nameError = 'Это поле обязательно';
    } else {
      NewProperties.nameError = '';
    }

    if (!(properties.email && properties.email.match(EmailRegex))) {
      NewProperties.emailError = 'Это поле обязательно';
    } else {
      NewProperties.emailError = '';
    }

    if (
      !(
        properties.phoneNumber &&
        properties.phoneNumber.match(PhoneNumberRegex)
      )
    ) {
      NewProperties.phoneNumberError = 'Это поле обязательно';
    } else {
      NewProperties.phoneNumberError = '';
    }

    if (!properties.message) {
      NewProperties.messageError = 'Это поле обязательно';
    } else {
      NewProperties.messageError = '';
    }

    if (!properties.telegram) {
      NewProperties.telegramError = 'Это поле обязательно';
    } else {
      NewProperties.telegramError = '';
    }

    if (
      NewProperties.emailError ||
      NewProperties.nameError ||
      NewProperties.phoneNumberError ||
      NewProperties.messageError ||
      NewProperties.telegramError
    ) {
      setProperties({ ...NewProperties });
      return false;
    }

    return true;
  };

  const submit = () => {
    if (validate()) {
      fetch('http://silencecraft.ru:3000', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(properties),
      }).then(res => {
        console.debug(res)
        if (!res) {return} if(res.status === 404) {properties.telegramError = 'Не удалось найти пользователя с таким никнеймом\nВозможно, Вы не написали боту @playliststogether_bot'}});
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Форма</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.formsContainer}>
        <div className={styles.inputs}>
          <p>Имя:</p>
          <input
            type="text"
            placeholder="Иван"
            className="name"
            onChange={handleInputChange}
          />
          <div className={styles.error}>{properties.nameError}</div>
        </div>
        <div className={styles.inputs}>
          <p>E-Mail:</p>
          <input
            type="text"
            placeholder="ivan@gmail.com"
            className="email"
            onChange={handleInputChange}
          />
          <div className={styles.error}>{properties.emailError}</div>
        </div>
        <div className={styles.inputs}>
          <p>Телефон:</p>
          <input
            type="text"
            placeholder="+78068195697"
            className="phoneNumber"
            onChange={handleInputChange}
          />
          <div className={styles.error}>{properties.phoneNumberError}</div>
        </div>
        <div className={styles.inputs}>
          <p>Telegram:</p>
          <input
            type="text"
            placeholder="@EvanEnev"
            className="telegram"
            onChange={handleInputChange}
          />
          <div className={styles.error}>{properties.telegramError}</div>
        </div>
        <div className={styles.inputs}>
          <p>Сообщение:</p>
          <input
            type="text"
            placeholder="Я, Иванов Иван.."
            className="message"
            onChange={handleInputChange}
          />
          <div className={styles.error}>{properties.messageError}</div>
        </div>
        <div className={styles.submitButton} onClick={submit}>
          Отправить
        </div>
      </div>
    </div>
  );
}
