package webdev.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import webdev.models.Course;
import webdev.models.Lesson;
import webdev.models.Module;
import webdev.repositories.CourseRepository;
import webdev.repositories.LessonRepository;
import webdev.repositories.ModuleRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class LessonService {
	@Autowired
	LessonRepository lessonRepository;	
	@Autowired
	CourseRepository courseRepository;
	@Autowired
	ModuleRepository moduleRepository;
	@PostMapping("/api/course/{courseId}/module/{mid}/lesson")
	public Lesson createLesson(@PathVariable("mid") int moduleId,@RequestBody Lesson newlesson) {
		Optional<Module> data = moduleRepository.findById(moduleId);
		if(data.isPresent()) {
			Module module = data.get();
			newlesson.setModule(module);;

			return lessonRepository.save(newlesson);
		}
		return null;	 
	}

	@GetMapping("/api/lesson")
	public Iterable<Lesson> findAllLessons() {
		return lessonRepository.findAll(); 
	}
	@GetMapping("/api/course/{courseId}/module/{mid}/lesson")
	public List<Lesson> findAllLessonssForModule(@PathVariable("mid") int moduleId) {
		Optional<Module> data =moduleRepository.findById(moduleId);
		if(data.isPresent()) {
			Module module = data.get();
			return module.getLessons();
			
		}
		return null;		
	}
	@DeleteMapping("/api/lesson/{id}")
	public void deleteLesson(@PathVariable("id")int LessonId) {
		lessonRepository.deleteById(LessonId);
	}
	

}
