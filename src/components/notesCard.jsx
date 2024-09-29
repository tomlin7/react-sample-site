import styles from "./notesCard.module.css";

export const NotesCard = ({ note }) => {
  return (
    <div className={styles.notesCard}>
      <h3>All notes</h3>
      <textarea
        defaultValue={
          note
            ? note
            : "You haven't written any notes yet. Go ahead and write one!"
        }
      ></textarea>
    </div>
  );
};
