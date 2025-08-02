import React from 'react';
import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '1,234',
      icon: Users,
      color: 'var(--primary-color)',
      trend: '+12%'
    },
    {
      title: 'Appointments Today',
      value: '24',
      icon: Calendar,
      color: 'var(--success-color)',
      trend: '+8%'
    },
    {
      title: 'Success Rate',
      value: '87%',
      icon: TrendingUp,
      color: 'var(--info-color)',
      trend: '+5%'
    },
    {
      title: 'Reports Generated',
      value: '156',
      icon: FileText,
      color: 'var(--warning-color)',
      trend: '+15%'
    }
  ];

  return (
    <div className="dashboard fade-in">
      <div className="row mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-md-3 mb-3">
              <div className="dashboard-card">
                <div className="card-icon" style={{ backgroundColor: stat.color }}>
                  <Icon size={24} />
                </div>
                <div className="card-title">{stat.title}</div>
                <div className="card-value">{stat.value}</div>
                <div className="text-success small">
                  {stat.trend} from last month
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Recent Patients</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Treatment</th>
                    <th>Status</th>
                    <th>Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sarah Johnson</td>
                    <td>32</td>
                    <td>IVF Cycle 1</td>
                    <td><span className="badge bg-success">Active</span></td>
                    <td>2024-01-15</td>
                  </tr>
                  <tr>
                    <td>Emily Davis</td>
                    <td>28</td>
                    <td>IUI</td>
                    <td><span className="badge bg-info">Monitoring</span></td>
                    <td>2024-01-14</td>
                  </tr>
                  <tr>
                    <td>Lisa Wilson</td>
                    <td>35</td>
                    <td>IVF Cycle 2</td>
                    <td><span className="badge bg-warning">Pending</span></td>
                    <td>2024-01-13</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Upcoming Appointments</h5>
            <div className="list-group list-group-flush">
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Sarah Johnson</h6>
                  <small>10:00 AM - Consultation</small>
                </div>
                <small>Today</small>
              </div>
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Emily Davis</h6>
                  <small>2:30 PM - Follow-up</small>
                </div>
                <small>Today</small>
              </div>
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Lisa Wilson</h6>
                  <small>9:00 AM - Treatment</small>
                </div>
                <small>Tomorrow</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};