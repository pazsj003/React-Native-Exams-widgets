package webdev.models;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
public class Course {
	 @OneToMany(mappedBy="course")
	    private List<Module> modules;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String title;
	@Temporal(TemporalType.TIMESTAMP)
		private Date created;
		@Temporal(TemporalType.TIMESTAMP)
		private Date modified;
		

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
	public List<Module> getModules() {
		return modules;
	}


	public void setModules(List<Module> modules) {
		this.modules = modules;
	}


	public void setId(int id) {
		this.id = id;
	}
}
