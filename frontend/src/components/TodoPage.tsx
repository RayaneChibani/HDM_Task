import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleFetchTasks = async () => {
    try {
      const tasks = await api.get('/tasks');
      if (Array.isArray(tasks)) {
        setTasks(tasks);
      } else {
        console.error('Les données récupérées ne sont pas un tableau.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setLoading(true);
      try {
        const response = await api.delete(`/tasks/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la tâche.');
        }
        handleFetchTasks(); // Rafraîchir les tâches après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleSave = async (task: Task) => {
    if (!task.name.trim()) {
      console.error('Le nom de la tâche ne peut pas être vide.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await api.put(`/tasks/${task.id}`, task);
      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde de la tâche.');
      }
      handleFetchTasks(); // Rafraîchir les tâches après sauvegarde
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la tâche:', error);
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%" key={task.id}>
              <TextField
                size="small"
                value={task.name}
                fullWidth
                sx={{ maxWidth: 350 }}
                onChange={(e) => {
                  const updatedTask = { ...task, name: e.target.value };
                  handleSave(updatedTask); // Sauvegarde automatique à chaque changement
                }}
              />
              <Box>
                <IconButton color="success" disabled>
                  <Check />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body1">Aucune tâche disponible.</Typography>
        )}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" onClick={() => {}}>Ajouter une tâche</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
