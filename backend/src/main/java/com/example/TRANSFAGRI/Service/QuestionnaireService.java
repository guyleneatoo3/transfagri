package com.example.TRANSFAGRI.Service;

import com.example.TRANSFAGRI.Model.Questionnaire;
import com.example.TRANSFAGRI.Repository.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionnaireService {
    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    public Questionnaire save(Questionnaire questionnaire) {
        return questionnaireRepository.save(questionnaire);
    }
}
