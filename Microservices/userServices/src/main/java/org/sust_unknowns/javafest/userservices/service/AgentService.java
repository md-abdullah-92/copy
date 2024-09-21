package org.sust_unknowns.javafest.userservices.service;

import org.sust_unknowns.javafest.userservices.model.Agent;
import org.sust_unknowns.javafest.userservices.repository.AgentRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgentService {

    private final AgentRepository agentRepository;

    public AgentService(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    public void saveAgent(Agent agent) {
        agentRepository.save(agent);
    }

    public boolean checkAgent(String email) {
        return agentRepository.existsByEmail(email);
    }

    public Agent getAgentByEmail(String email) {
        return agentRepository.findByEmail(email);
    }

    public Agent getAgentById(String id) {
        Optional<Agent> agent = agentRepository.findById(id);
        return agent.orElse(null);
    }

    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    public void deleteAgent(String id) {
        agentRepository.deleteById(id);
    }

    public void updateAgent(Agent agent) {
        agentRepository.save(agent);
    }

    public boolean checkAgentById(String id) {
        return agentRepository.existsById(id);
    }

    // get all agent
    public List<Agent> getAllAgent() {
        return agentRepository.findAll();
    }

}
