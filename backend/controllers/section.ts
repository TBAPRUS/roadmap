import { Request, Response } from 'express';
import { Section } from '../models/Section';
import { Roadmap } from '../models/Roadmap';
import { RequestUser } from '../interfaces/request';
import { AsyncHandler } from '../middleware/async';
import { ErrorResponse } from '../utils/errorResponse';

// @desc      Middleware verification
// @route     ANY /api/v1/roadmaps/:roadmapId/sections/(:id)
// @access    Private
export const verify = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    const roadmap = await Roadmap.findById(req.params.roadmapId);

    if (!roadmap) {
      return next(
        new ErrorResponse(
          `Roadmaps not found with user id of ${req.params.roadmapId}`,
          404
        )
      );
    }

    if (roadmap.owner != req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`You are not the owner of this roadmap`, 401)
      );
    }

    if (req.params.id) {
      const section = await Section.findById(req.params.id);

      if (!section) {
        return next(
          new ErrorResponse(
            `Section not found with id of ${req.params.id}`,
            404
          )
        );
      }

      if (section.owner != req.user.id && req.user.role !== 'admin') {
        return next(
          new ErrorResponse(`You are not the owner of this roadmap`, 401)
        );
      }
    }

    next();
  }
);

// @desc      Create section
// @route     POST /api/v1/roadmaps/:roadmapId/sections/
// @access    Private
export const createSection = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    let roadmap = await Roadmap.findById(req.params.roadmapId);

    if (roadmap.sections.length >= 20) {
      next(new ErrorResponse('Sections limit 20', 400));
    }

    req.body.owner = req.user.id;
    req.body.roadmap = req.params.roadmapId;

    const section = await Section.create(req.body);

    roadmap = await Roadmap.findByIdAndUpdate(
      req.params.roadmapId,
      {
        sections: [...roadmap.sections, section.id],
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate('sections');

    res.status(201).json({ success: true, data: roadmap });
  }
);

// @desc      Update section
// @route     PUT /api/v1/roadmaps/:roadmapId/sections/:id
// @access    Private
export const updateSection = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: section });
  }
);

// @desc      Delete section
// @route     DELETE /api/v1/roadmaps/:roadmapId/section/:id
// @access    Private
export const deleteSection = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    const section = await Section.findById(req.params.id);

    await section.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
