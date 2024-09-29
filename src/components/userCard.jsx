import styles from "./userCard.module.css";

import { userPlaceholder } from "../data/data";

/// User Card
export const UserCard = ({ user, signOut }) => {
  return (
    <div className={styles.userCard}>
      <img
        src={userPlaceholder}
        width={80}
        height={80}
        alt="User avatar"
        className={styles.avatar}
      />
      <div className={styles.userInfo}>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <h2>{user.username}</h2>
        <div className={styles.categories}>
          {user.categories.length <= 6 &&
            user.categories.map((category) => (
              <span key={category} className={styles.category}>
                {category}
              </span>
            ))}

          {user.categories.length > 6 &&
            user.categories.slice(0, 5).map((category) => (
              <span key={category} className={styles.category}>
                {category}
              </span>
            ))}
          {user.categories.length > 6 && (
            <span className={styles.category}>
              +{user.categories.length - 5} more
            </span>
          )}
        </div>
        <button className={styles.signoutButton} onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};
