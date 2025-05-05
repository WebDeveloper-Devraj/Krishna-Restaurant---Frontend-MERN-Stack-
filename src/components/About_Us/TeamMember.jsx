import styles from "./AboutUs.module.css";

const TeamMember = ({ member }) => {
  return (
    <div className={styles.teamMember}>
      <img src={member.image} alt={member.name} />
      <div>
        <h3>{member.name}</h3>
        <p>{member.description}</p>
      </div>
    </div>
  );
};

export default TeamMember;
