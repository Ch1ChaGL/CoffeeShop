import React, { useState } from 'react';
import s from './FAQ.module.css';
import Container from '../../components/Container/Container';
import SendEmailService from '../../API/SendEmailService';
import SaveModal from '../../components/UI/SaveModal/SaveModal';
function FAQ() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setIsSave(true);
    // Отправка сообщения на сервер или другую обработку
    try {
      SendEmailService.sendEmail({
        Name: name,
        Email: email,
        Message: message,
      });
      // Очистка полей формы
      setName('');
      setEmail('');
      setMessage('');
      setError(false);
      setSubmitMessage('Письмо успешно отправлено');
    } catch (err) {
      setError(true);
      setSubmitMessage(err.response.data.message);
    }
  };
  if (isSave) {
    return (
      <SaveModal setIsSave={setIsSave} error={error}>
        {submitMessage}
      </SaveModal>
    );
  }
  return (
    <Container>
      <div className={s.container}>
        <h1 className={s.title}>Обратная связь</h1>
        <form className={s.form} onSubmit={handleSubmit}>
          <label htmlFor='name' className={s.label}>
            Имя:
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={e => setName(e.target.value)}
            className={s.input}
            required
          />

          <label htmlFor='email' className={s.label}>
            Email:
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={s.input}
            required
          />

          <label htmlFor='message' className={s.label}>
            Сообщение:
          </label>
          <textarea
            id='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
            className={s.textarea}
            required
          ></textarea>

          <button type='submit' className={s.submitButton}>
            Отправить
          </button>
        </form>
      </div>
    </Container>
  );
}

export default FAQ;
