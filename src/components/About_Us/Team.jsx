import styles from "./AboutUs.module.css";
import TeamMember from "./TeamMember";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { flashMessageActions } from "../../store/slices/flashMessage";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonial = async () => {
      const res = await fetch(`${BASE_URL}/restaurant/members`);
      const data = await res.json();

      if (data.success) {
        setMembers(data.members);
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: "Error in fetching members!",
            type: "error",
          })
        );
      }
      setLoading(false);
    };

    fetchTestimonial();
  }, []);

  return (
    <section className={styles.teamSection}>
      <h2>Meet the Team</h2>
      {loading ? (
        <LoadingSpinner />
      ) : members.length === 0 ? (
        <p className={styles.no_members_msg}>
          No team members to display at the moment.
        </p>
      ) : (
        <div className={styles.teamMembers}>
          {members.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Team;
