'use client';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  tags?: string[];
}

export default function JobCard({
  title,
  company,
  location,
  description,
  salary,
  tags = [],
}: JobCardProps) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src={`https://via.placeholder.com/48?text=${company.charAt(0)}`}
                alt={company}
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-5">{title}</p>
            <p className="subtitle is-6">
              {company} • {location}
            </p>
          </div>
        </div>

        <div className="content">
          <p>{description}</p>

          {salary && (
            <div className="block">
              <span className="tag is-light is-info">💰 {salary}</span>
            </div>
          )}

          {tags.length > 0 && (
            <div className="block">
              {tags.map((tag) => (
                <span key={tag} className="tag is-light mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            Ver Vaga
          </a>
          <a href="#" className="card-footer-item">
            Salvar
          </a>
          <a href="#" className="card-footer-item">
            Compartilhar
          </a>
        </footer>
      </div>
    </div>
  );
}
