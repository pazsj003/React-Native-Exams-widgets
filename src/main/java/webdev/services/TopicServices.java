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

import webdev.models.Lesson;

import webdev.models.Topic;
import webdev.repositories.CourseRepository;
import webdev.repositories.LessonRepository;
import webdev.repositories.ModuleRepository;
import webdev.repositories.TopicRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class TopicServices {
	@Autowired
	LessonRepository lessonRepository;	
	@Autowired
	CourseRepository courseRepository;
	@Autowired
	ModuleRepository moduleRepository;
	@Autowired
	TopicRepository topicRepository;
	@PostMapping("/api/course/{courseId}/module/{mid}/lesson/{lessonId}/topic")
	public Topic createTopic(@PathVariable("lessonId") int lessonId,@RequestBody Topic newtopic) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		if(data.isPresent()) {
			Lesson lesson = data.get();
			newtopic.setLesson(lesson);

			return topicRepository.save(newtopic);
		}
		return null;	 
	}

	@GetMapping("/api/topic")
	public Iterable<Topic> findAllTopics() {
		return topicRepository.findAll(); 
	}
	
	@GetMapping("/api/course/{courseId}/module/{mid}/lesson/{lessonId}/topic")
	public List<Topic> findAllTopicsForLesson(@PathVariable("lessonId") int lessonId) {
		Optional<Lesson> data =lessonRepository.findById(lessonId);
		if(data.isPresent()) {
			Lesson lesson = data.get();
			return lesson.getTopics();
			
		}
		return null;		
	}
	@DeleteMapping("/api/topic/{id}")
	public void deleteTopicId(@PathVariable("id")int topicId) {
		topicRepository.deleteById(topicId);
	}
}
