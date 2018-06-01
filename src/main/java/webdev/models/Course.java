package webdev.models;
import java.util.Date;
import javax.persistence.*;

@Entity
public class Course {
	private String title;
	@Temporal(TemporalType.TIMESTAMP)
		private Date created;
		@Temporal(TemporalType.TIMESTAMP)
		private Date modified;
		

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public Date getCreated() {
		return created;
	}


	public void setCreated(Date created) {
		this.created = created;
	}


	public Date getModified() {
		return modified;
	}


	public void setModified(Date modified) {
		this.modified = modified;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}
}
